// popup.js

document.addEventListener('DOMContentLoaded', function() {
    var refineContentButton = document.getElementById('refineContent');
    var resultDiv = document.getElementById('result');

    // Add event listener for refine content button
    refineContentButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "refine_content"});
        });
    });

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.message === "analyze_profile") {
                // Display the analysis result
                resultDiv.innerHTML = '<h2>Profile Analysis Result</h2>' + request.result;
            }
            else if (request.message === "refine_content") {
                // Display the refined content
                resultDiv.innerHTML = '<h2>Refined Content</h2>' + request.result;
            }
        }
    );
});
