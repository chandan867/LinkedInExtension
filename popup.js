// // popup.js


document.addEventListener('DOMContentLoaded',function() {
    var refineContentButton = document.getElementById('refineContent');
    var resultDiv = document.getElementById('result');

    // Add event listener for refine content button
    refineContentButton.addEventListener('click',async function() {
       let contentToRefine="I am learning blockchain and want to connect with other people too";
       let refinedContent=await refineContent(contentToRefine);
       resultDiv.innerText = refinedContent;

    });


});

async function refineContent(contentData) {
    let contentText = JSON.stringify(contentData);

    let response = await fetch('http://localhost:3991/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: contentText })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    let refinedContent = await response.json();
    console.log(refineContent);
    return refinedContent.result;
    
}
