// Mode configurations
const MODES = {
  regular: {
    brightness: 100,
    contrast: 90,
    sepia: 10
  },
  amoled: {
    brightness: 100,
    contrast: 100,
    sepia: 0,
    darkSchemeBackgroundColor: "#000000",
    darkSchemeTextColor: "#ffffff"
  }
};

// Apply or update dark mode
async function applyDarkMode(tabId, mode) {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['darkreader.js']
  });
  
  await chrome.scripting.executeScript({
    target: { tabId },
    args: [mode, MODES],
    function: (mode, modes) => {
      if (window.DarkReader) {
        if (window.darkModeEnabled) {
          DarkReader.disable();
        }
        DarkReader.enable(modes[mode]);
        window.darkModeEnabled = true;
        window.currentMode = mode;
      }
    }
  });
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "updateMode") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        applyDarkMode(tabs[0].id, request.mode);
      }
    });
  }
});

// Handle browser action click (now handled by popup)
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('darkModeType', (data) => {
    const mode = data.darkModeType || 'regular';
    applyDarkMode(tab.id, mode);
  });
});