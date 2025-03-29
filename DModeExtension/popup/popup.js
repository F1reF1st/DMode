document.getElementById('regularMode').addEventListener('click', () => {
    setMode('regular');
  });
  
  document.getElementById('amoledMode').addEventListener('click', () => {
    setMode('amoled');
  });
  
  function setMode(mode) {
    chrome.storage.sync.set({ darkModeType: mode }, () => {
      updateActiveButton(mode);
      // Send message to background script to update current tab
      chrome.runtime.sendMessage({ command: "updateMode", mode: mode });
    });
  }
  
  function updateActiveButton(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', 
        (mode === 'regular' && btn.id === 'regularMode') ||
        (mode === 'amoled' && btn.id === 'amoledMode')
      );
    });
  }
  
  // Initialize
  chrome.storage.sync.get('darkModeType', (data) => {
    const mode = data.darkModeType || 'regular';
    updateActiveButton(mode);
  });