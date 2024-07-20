/** @format */

// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5000;
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
const fetchAllPages = async (url) => {
	let results = [];
	let nextURL = url;

	while (nextURL) {
		const response = await axios.get(nextURL);
		results = results.concat(response.data.results);
		nextURL = response.data.next;
	}

	return results;
};

app.get('/getQuizData', async (req, res) => {
	try {
		const films = await fetchAllPages('https://swapi.dev/api/films/');
		const people = await fetchAllPages('https://swapi.dev/api/people/');
		const planets = await fetchAllPages('https://swapi.dev/api/planets/');

		res.json({ films, people, planets });
	} catch (error) {
		res.status(500).send('Error fetching data');
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
