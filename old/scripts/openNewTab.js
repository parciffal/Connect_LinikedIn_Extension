export async function openNewTab() {
    return new Promise((resolve) => {
      
      chrome.tabs.create({ url: "https://www.linkedin.com/mynetwork/invite-connect/connections/", index: 0 }, (tab) => {
        console.log(tab)
        resolve(0);
      });
    });
};