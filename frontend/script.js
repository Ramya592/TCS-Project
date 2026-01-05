document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const message = document.getElementById('message').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (data.success) {
            resultDiv.innerHTML = `Sentiment: ${data.sentiment}`;
        } else {
            resultDiv.innerHTML = 'Error submitting feedback';
        }

    } catch (error) {
        resultDiv.innerHTML = 'Server not reachable';
    }
});
