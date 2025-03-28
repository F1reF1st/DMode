chrome.action.onClicked.addListener(async (tab) => {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['darkreader.js']
    });
  
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleDarkReader
    });
  });
  
  function toggleDarkReader() {
    if (window.DarkReader && !window.darkReaderEnabled) {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10
      });
      window.darkReaderEnabled = true;
    } else if (window.DarkReader && window.darkReaderEnabled) {
      DarkReader.disable();
      window.darkReaderEnabled = false;
    }
  }