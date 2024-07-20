/** @format */

// /** @format */

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const getRandomCharacter = (people) => {
	const randomNum = getRandomIndex(people.length);

	return people[randomNum];
};

const getRandomMovie = (films) => {
	const randomNum = getRandomIndex(films.length);
	return films[randomNum];
};

const getRandomPlanet = (planets) => {
	const randomNum = getRandomIndex(planets.length);
	return planets[randomNum];
};

const Choiceshuffeler = (array) => {
	let currentIndex = array.length, //5
		temporaryValue, // null
		randomIndex; // null

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex); // randomIndex = 2
		currentIndex--; //4

		temporaryValue = array[currentIndex]; //array[currentIndex] = 3
		array[currentIndex] = array[randomIndex]; // array[currentIndex] = 3 // array[randomIndex] =2
		array[randomIndex] = temporaryValue; // array[randomIndex] =2 // temporaryValue = whatever number was on index 3
	}
	return array;
};

const quizQuestionsGenerator = (data) => {
	const directors = [
		'George Lucas',
		'Irvin Kershner',
		'Richard Marquand',
		' J.J. Abrams',
		'Rain Johnson ',
		'Jon Favreau',
		'Patty Jenkins',
		'James Mangold',
	];
	let count = 0;
	const numOfChoices = 3;
	const { films, people, planets } = data;
	if (!planets?.length || !films?.length || !people?.length) {
		return <div>No data available</div>;
	}
	const character = getRandomCharacter(people);
	const movie = getRandomMovie(films);
	const planet = getRandomPlanet(planets);
	const characterHomeworld = planets?.find(
		(planet) => planet.url === character.homeworld
	)?.name;
	const questions = [
		{
			question: `What is the height of ${character.name}?`,
			choices: [character.height],
			answer: character.height,
			type: 'characterHeight',
		},
		{
			question: `When was ${character.name} born?`,
			choices: [character.birth_year],
			answer: character.birth_year,
			type: 'characterBirthYear',
		},
		{
			question: `What planet is ${character.name} from?`,
			choices: [characterHomeworld],
			answer: characterHomeworld,
			type: 'characterHomeworld',
		},
		{
			question: `Who directed ${movie.title}?`,
			choices: [movie.director],
			answer: movie.director,
			type: 'characterDirector',
		},
		{
			question: `When was ${movie.title} released?`,
			choices: [movie.release_date],
			answer: movie.release_date,
			type: 'characterReleaseDate',
		},
		{
			question: `What is the terrain of ${planet.name}?`,
			choices: [planet.terrain],
			answer: planet.terrain,
			type: 'characterTerrain',
		},
	];

	//const name = characterChoices(people, planets);
	//console.log('name: ', name[7]);

	questions.forEach((question) => {
		switch (question.type) {
			case 'characterHeight':
				while (count < numOfChoices) {
					const random = getRandomIndex(people.length);
					if (!question.choices.includes(people[random]?.height)) {
						question.choices.push(people[random]?.height);
						count++;
					}
				}
				count = 0;
				break;
			case 'characterBirthYear':
				while (count < numOfChoices) {
					const random = getRandomIndex(people.length);
					if (!question.choices.includes(people[random]?.birth_year)) {
						question.choices.push(people[random]?.birth_year);
						count++;
					}
				}
				count = 0;
				break;
			case 'characterHomeworld':
				while (count < numOfChoices) {
					const random = getRandomIndex(planets.length);
					const planetUrl = planets[random]?.url;

					const characterHomeworld = planets.find(
						(planet) => planet.url === planetUrl
					)?.name;
					if (!question.choices.includes(characterHomeworld)) {
						question.choices.push(characterHomeworld);
						count++;
					}
				}
				count = 0;
				break;
			case 'characterDirector':
				while (count < numOfChoices) {
					const random = getRandomIndex(directors.length);
					if (!question.choices.includes(directors[random])) {
						question.choices.push(directors[random]);
						count++;
					}
				}
				count = 0;
				break;
			case 'characterReleaseDate':
				while (count < numOfChoices) {
					const random = getRandomIndex(films.length);

					if (!question.choices.includes(films[random]?.release_date)) {
						question.choices.push(films[random]?.release_date);
						count++;
					}
				}
				count = 0;
				break;
			case 'characterTerrain':
				while (count < numOfChoices) {
					const random = getRandomIndex(planets.length);
					if (!question.choices.includes(planets[random]?.terrain)) {
						question.choices.push(planets[random]?.terrain);
						count++;
					}
				}
				count = 0;
				break;

			default:
				break;
		}
		question.choices = Choiceshuffeler(question.choices);
	});

	console.log('questions: ', questions);

	return questions;
};

export default quizQuestionsGenerator;
