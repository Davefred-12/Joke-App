const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // To parse form data

app.get('/', (req, res) => {
    res.render('welcome'); // Render the welcome page initially
});

// Route to render the main app (index.ejs)
app.get('/app', (req, res) => {
    res.render('index', { wordData: null }); // Render the main page when "Enter App" is clicked
});

// Endpoint to get a joke
app.get('/get-joke', async (req, res) => {
    try {
        const jokeResponse = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.json(jokeResponse.data);
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).send('Error fetching joke');
    }
});

// Endpoint to get word details from the Free Dictionary API
app.post('/get-word', async (req, res) => {
    const word = req.body.word; // Get word from form data
    try {
        const wordResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const wordData = wordResponse.data[0]; // Assuming you want the first entry
        res.render('index', { wordData });
    } catch (error) {
        console.error('Error fetching word details:', error);
        res.render('index', { wordData: null }); // Render 'index.ejs' without word data on error
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
