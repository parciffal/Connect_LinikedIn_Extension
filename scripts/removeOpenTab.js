export async function removeOpenTab() {
  console.log("taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab")
  return new Promise((resolve) => {
    chrome.tabs.remove({ index: 0 }, (tab) => {
      console.log(tab)
      resolve(0);
    });
  });
};