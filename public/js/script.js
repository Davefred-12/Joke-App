document.getElementById('get-joke-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/get-joke');
        const joke = await response.json();
        document.getElementById('joke-display').innerText = `${joke.setup} - ${joke.punchline}`;
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
});

document.getElementById('word-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = document.getElementById('word-input').value;
    try {
        const response = await fetch(`/get-word/${word}`);
        const wordDetails = await response.json();
        document.getElementById('word-details').innerText = JSON.stringify(wordDetails, null, 2);
    } catch (error) {
        console.error('Error fetching word details:', error);
    }
});
