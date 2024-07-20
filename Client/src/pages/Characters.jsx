/** @format */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultImage from '../img/logos/StarWarsLogo.png'; // Default image
import useSWAPIData from '../hooks/useSWAPIData';
import { characterImages } from '../data/data.js';
import '../css/flip-card.css';

function Characters() {
	const { t } = useTranslation();
	const { data, isLoading, error } = useSWAPIData();
	const [characterData, setCharacterData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const itemsPerPage = 9; // Number of items per page

	useEffect(() => {
		if (data && data.people) {
			setCharacterData(data.people);
		}
	}, [data]);

	if (isLoading) {
		return <div>{t('loading')}</div>;
	} else if (error) {
		return <div>{t('error', { error })}</div>;
	}

	const handleNextClick = () => {
		setPageNumber((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPageNumber((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
	};

	const startIndex = (pageNumber - 1) * itemsPerPage;
	const currentCharacters = characterData.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	const CharacterHomeWorld = (homeworld, planets) => {
		if (!planets) {
			return t('characters_unknown');
		}
		const home = planets.find((planet) => planet.url === homeworld);
		return home ? home.name : t('characters_unknown');
	};

	return (
		<div className='flex flex-col items-center justify-center h-full p-6 text-white'>
			<h1 className='mb-5 text-3xl font-bold drop-shadow-lg'>
				{t('characters_title')}
			</h1>
			<div className='grid grid-cols-3 gap-4 mb-10'>
				{currentCharacters.map((character, index) => (
					<div key={index} className='flip-card'>
						<div className='flip-card-inner'>
							<div className='flip-card-front'>
								<img
									src={characterImages[character.name] || DefaultImage}
									alt={character.name}
									className='character-image'
								/>
							</div>
							<div className='flip-card-back'>
								<h2 className='text-yellow-400'>{character.name}</h2>
								<p>{t('characters_height', { height: character.height })}</p>
								<p>
									{t('characters_birth_year', {
										birthYear: character.birth_year,
									})}
								</p>
								<p>{t('characters_gender', { gender: character.gender })}</p>
								<p>
									{t('characters_homeworld', {
										homeworld: CharacterHomeWorld(
											character.homeworld,
											data.planets
										),
									})}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='flex gap-2'>
				<button
					className='p-2 font-mono bg-yellow-500 rounded-lg'
					onClick={handlePrevPage}
					disabled={pageNumber === 1}
				>
					{t('characters_prev_page')}
				</button>
				<button
					className='p-2 font-mono bg-yellow-500 rounded-lg'
					onClick={handleNextClick}
					disabled={startIndex + itemsPerPage >= characterData.length}
				>
					{t('characters_next_page')}
				</button>
			</div>
		</div>
	);
}

export default Characters;
