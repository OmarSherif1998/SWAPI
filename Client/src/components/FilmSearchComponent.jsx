/** @format */

import React from 'react';
import { movieImages } from '../data/data';
import SWLogo from '../img/logos/StarWarsLogo.png';
function FilmSearchComponent({ data }) {
	const film = data[0];

	const imgURL = movieImages[film.title] || SWLogo;

	return (
		<div className='flex items-center min-w-full min-h-full p-6 m-4 text-white bg-gray-900 rounded-lg shadow-2xl'>
			<div className='flex-shrink-0 w-64 mr-4 h-72'>
				<img
					src={imgURL}
					alt={film.title}
					className='w-full h-full rounded-lg shadow-2xl '
				/>
			</div>
			<div className='flex-grow'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-3xl font-extrabold tracking-wide text-yellow-500'>
						{film.title}
					</h2>
				</div>

				<div className='text-lg text-gray-300'>
					<p>Release Date: {film.release_date}</p>
					<p>Director: {film.director}</p>
					<p className='mb-1'>Episode Number: {film.episode_id}</p>
					<p className='mb-1'>Opening Crawl: {film.opening_crawl}</p>
				</div>
			</div>
		</div>
	);
}

export default FilmSearchComponent;
