

// AI का उपयोग करके सामग्री को परिष्कृत करने के लिए फ़ंक्शन
async function refineContent(contentData) {
    // सामग्री डेटा को पाठ में परिवर्तित करें
    let contentText = JSON.stringify(contentData);

    // स्थानीय सर्वर का उपयोग करके सामग्री को परिष्कृत करें
    let response = await fetch('http://localhost:3991/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: contentText })
    });

    // परिष्कृत सामग्री के साथ प्रतिसाद प्राप्त करें
    let refinedContent = await response.json();

    // परिष्कृत सामग्री वापस दें
    return refinedContent;
}

// // Export the functions
// module.exports = {

//     refineContent
// };
