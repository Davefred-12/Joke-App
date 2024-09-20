document.addEventListener('DOMContentLoaded', function() {
    const jokeButton = document.getElementById('get-joke-btn');
    const jokeDisplay = document.getElementById('joke-display');

    if (jokeButton) {
        jokeButton.addEventListener('click', function() {
            // Fetch a random joke from your joke API
            fetch('https://official-joke-api.appspot.com/random_joke')
                .then(response => response.json())
                .then(data => {
                    jokeDisplay.textContent = `${data.setup} - ${data.punchline}`;
                })
                .catch(error => {
                    console.error('Error fetching joke:', error);
                });
        });
    }
});
