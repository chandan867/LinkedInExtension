// options.js

// Save options to chrome.storage
function save_options() {
  var analyzeProfile = document.getElementById('analyzeProfile').checked;
  var refineContent = document.getElementById('refineContent').checked;
  chrome.storage.sync.set({
    analyzeProfile: analyzeProfile,
    refineContent: refineContent
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value analyzeProfile = true and refineContent = true.
  chrome.storage.sync.get({
    analyzeProfile: true,
    refineContent: true
  }, function(items) {
    document.getElementById('analyzeProfile').checked = items.analyzeProfile;
    document.getElementById('refineContent').checked = items.refineContent;
  });
}

// Event listeners for the DOM
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
