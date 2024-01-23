async function refineContent(contentData) {
    let contentText = JSON.stringify(contentData);

    let response = await fetch('http://localhost:3991/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: contentText })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let refinedContent = await response.json();
    console.log(refineContent);
    return refinedContent;
    
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "refine_content") {
            // Refine the content here
            refineContent(request.contentData)
                .then(refinedContent => {
                    sendResponse({result: refinedContent});
                })
                .catch(error => {
                    console.error('Error:', error);
                    sendResponse({error: 'Failed to refine content.'});
                });

            // Indicate that the response will be sent asynchronously
            // return true;
        }
    }
);
