const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(express.json());

const BASE_URL = 'https://swapi.dev/api/people/';

const fetchAllPeople = async () => {
    let allPeople = [];
    let url = BASE_URL;

    while (url) {
        try {
            const response = await axios.get(url);
            const data = response.data;

            allPeople = allPeople.concat(data.results);
            url = data.next;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return allPeople;
};

app.get('/api/people', async (req, res) => {
    try {
        const people = await fetchAllPeople();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch people data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
