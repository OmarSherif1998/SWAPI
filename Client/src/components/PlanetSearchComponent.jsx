/** @format */

import React from 'react';
import SWLogo from '../img/logos/StarWarsLogo.png';
// import { useTranslation } from 'react-i18next';

function PlanetSearchComponent({ data }) {
	const planet = data[0];
	// const { t } = useTranslation();

	const imgURL = SWLogo;

	return (
		<div className='flex items-center max-w-2xl p-6 m-4 text-white bg-gray-900 rounded-lg shadow-2xl'>
			<div className='flex-shrink-0 w-64 mr-4 h-72'>
				<img
					src={imgURL}
					alt={planet.name}
					className='object-contain w-full h-full rounded-lg shadow-lg'
				/>
			</div>
			<div className='flex-grow'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-3xl font-extrabold tracking-wide text-yellow-500'>
						{planet.name}
					</h2>
				</div>
				<p className='mb-4 text-gray-300'>
					Climate: {planet.climate} | Population: {planet.population}
				</p>
				<div className='text-gray-300'>
					<p className='mb-1'>Diameter: {planet.diameter} km</p>
					<p className='mb-1'>Gravity: {planet.gravity}</p>
					<p className='mb-1'>Orbital Period: {planet.orbital_period} days</p>
					<p className='mb-1'>
						Rotation Period: {planet.rotation_period} hours
					</p>
					<p>Surface Water: {planet.surface_water}%</p>
					<p>Terrain: {planet.terrain}</p>
				</div>
			</div>
		</div>
	);
}

export default PlanetSearchComponent;
