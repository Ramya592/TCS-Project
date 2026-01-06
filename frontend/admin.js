fetch('https://smart-feedback-backend-ysg0.onrender.com/api/feedback')
    .then(res => res.json())
    .then(data => {

        const ctx = document.getElementById('sentimentChart').getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    data: [data.positive, data.negative, data.neutral]
                }]
            }
        });
    })
    .catch(err => console.log(err));
