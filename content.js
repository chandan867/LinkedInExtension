// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "refine_content") {
            // Send a message to the background script to refine the content
            chrome.runtime.sendMessage({message: "refine_content", contentData: "I am happy to join the firm"}, function(response) {
                if (response.success) {
                    // Wait for a message from the background script with the refined content
                    chrome.runtime.onMessage.addListener(
                        function(message) {
                            if (message.result !== undefined) {
                                sendResponse({result: message.result});
                            } else if (message.error !== undefined) {
                                sendResponse({error: message.error});
                            }
                        }
                    );
                } else {
                    sendResponse({error: 'Failed to refine content.'});
                }
            });

            // Indicate that the response will be sent asynchronously
            return true;
        }
    }
);

// content.js

// You'll need to capture the content of the page you want to refine here.
// For the sake of this example, let's assume you're capturing the page's title.

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.message === "refine_content") {
//             let contentToRefine = "I am joining a new firm" // This is a placeholder for the actual content you want to refine.
//             chrome.runtime.sendMessage({message: "refine_content", contentData: contentToRefine});
//             return true; // Indicate that the response will be sent asynchronously
//         }
//     }
// );
