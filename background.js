// background.js

let tabIndex = 0;
let tabOpened = false;

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openNewTab") {
    chrome.tabs.create(
      {
        url: "https://www.linkedin.com/mynetwork/invite-connect/connections/",
        index: 0,
      },
      (tab) => {
        console.log(tab.id);
        tabIndex = tab.id;
        tabOpened = true;
      }
    );
  }
  if (request.type === "contentScriptLoaded" && tabOpened) {
    if (tabOpened) {
      chrome.tabs.remove(tabIndex, () => {
        console.log("Tab closed");
      });
    }
    let extractedData = request.extracted;
    console.log("Content script loaded: ", extractedData);
    let csvContent = convertToCSV(extractedData);
    let filename = "extractedData.csv";

    chrome.downloads.download(
      {
        url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent),
        filename: filename,
        saveAs: true,
      },
      function (downloadId) {
        console.log("Download started with ID:", downloadId);
      }
    );
  }
});

function convertToCSV(data) {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map(obj => Object.values(obj).join(","));
  return [header, ...rows].join("\n");
}