/** @format */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarWarsLogo from '../img/logos/StarWarsLogo.png';
import useSWAPIData from '../hooks/useSWAPIData';
import '../css/flip-card.css';

function Planets() {
	const { t } = useTranslation();
	const { data, isLoading, error } = useSWAPIData();
	const [planetData, setPlanetData] = useState([]);
	const [morePlanetInfo, setMorePlanetInfo] = useState(false);
	const [PlanetInfo, setPlanetInfo] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		if (data && data.planets) {
			setPlanetData(data.planets);
		}
	}, [data]);

	if (isLoading) {
		return <div>{t('loading')}</div>;
	} else if (error) {
		return <div>{t('error', { error })}</div>;
	}

	const handleMoreInfoClick = (planet) => {
		if (planet) {
			setPlanetInfo(planet);
			setMorePlanetInfo(true);
		} else {
			setMorePlanetInfo(false);
			setPlanetInfo([]);
		}
	};

	const handleNextClick = () => {
		setPageNumber((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setPageNumber((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
	};

	const startIndex = (pageNumber - 1) * itemsPerPage;
	const currentPlanet = planetData.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div className='flex flex-col items-center justify-center gap-10 p-6 text-white'>
			{!morePlanetInfo ? (
				<>
					<h1 className='mb-5 text-3xl font-bold drop-shadow-lg'>
						{t('planets_title')}
					</h1>
					<div className='grid grid-cols-3 gap-8'>
						{currentPlanet.map((planet, index) => (
							<div key={index} className='flip-card'>
								<div className='flip-card-inner'>
									<div className='flip-card-front'>
										<img
											src={StarWarsLogo}
											alt={planet.name}
											className='planet-image'
										/>
									</div>
									<div className='flip-card-back'>
										<h2 className='text-yellow-400'>{planet.name}</h2>
										<p>
											{t('planets_population', {
												population: planet.population,
											})}
										</p>
										<p>{t('planets_terrain', { terrain: planet.terrain })}</p>
										<button
											className='p-2 mt-5 font-mono text-black bg-yellow-400 rounded-md'
											onClick={() => handleMoreInfoClick(planet)}
										>
											{t('planets_more_info')}
										</button>
									</div>
								</div>
								<div className=''>
									<h1 className='text-lg text-center'>{planet.name}</h1>
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
							{t('planets_previous_page')}
						</button>
						<button
							className='p-2 font-mono bg-yellow-500 rounded-lg'
							onClick={handleNextClick}
							disabled={startIndex + itemsPerPage >= planetData.length}
						>
							{t('planets_next_page')}
						</button>
					</div>
				</>
			) : (
				<div className='flex flex-col gap-5 p-6 bg-black bg-opacity-75 rounded-lg'>
					<div>
						<button
							className='p-2 mt-5 font-mono text-black bg-yellow-400 rounded-md'
							onClick={() => handleMoreInfoClick()}
						>
							{t('planets_back_to_planets')}
						</button>
					</div>
					<div className='flex gap-5'>
						<img
							src={StarWarsLogo}
							alt={PlanetInfo.name}
							className='flex-grow object-contain w-60'
						/>
						<div>
							<h1 className='text-4xl text-yellow-400 font-starwars'>
								{PlanetInfo.name}
							</h1>
							<p className='text-xl'>
								<span className='text-yellow-400'>
									{t('planets_population')}:
								</span>{' '}
								{PlanetInfo.population}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>{t('planets_terrain')}:</span>{' '}
								{PlanetInfo.terrain}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>
									{t('planets_surface_water')}:
								</span>{' '}
								{PlanetInfo.surface_water}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>{t('planets_climate')}:</span>{' '}
								{PlanetInfo.climate}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>{t('planets_gravity')}:</span>{' '}
								{PlanetInfo.gravity}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Planets;
