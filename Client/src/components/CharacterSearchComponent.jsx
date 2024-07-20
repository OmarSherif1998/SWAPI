/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { characterImages } from '../data/data';
import SWLogo from '../img/logos/StarWarsLogo.png';

function CharacterSearchComponent({ data }) {
	const { t } = useTranslation();
	const character = data[0];

	const imgURL = characterImages[character.name] || SWLogo;

	return (
		<div className='flex items-center max-w-2xl p-6 m-4 text-white bg-gray-900 rounded-lg shadow-2xl'>
			<div className='flex-shrink-0 w-64 mr-4 h-72'>
				<img
					src={imgURL}
					alt={character.name}
					className='object-contain w-full h-full rounded-lg shadow-lg'
				/>
			</div>
			<div className='flex-grow'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-3xl font-extrabold tracking-wide text-yellow-500'>
						{character.name}
					</h2>
				</div>
				<p className='mb-4 text-gray-300'>
					{t('height')}: {character.height} cm | {t('mass')}: {character.mass}{' '}
					kg
				</p>
				<div className='text-gray-300'>
					<p className='mb-1'>
						{t('gender')}: {character.gender}
					</p>
					<p className='mb-1'>
						{t('hair_color')}: {character.hair_color}
					</p>
					<p className='mb-1'>
						{t('skin_color')}: {character.skin_color}
					</p>
					<p className='mb-1'>
						{t('eye_color')}: {character.eye_color}
					</p>
					<p>
						{t('birth_year')}: {character.birth_year}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CharacterSearchComponent;
