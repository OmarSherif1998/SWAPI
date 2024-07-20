/** @format */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { movieImages } from '../data/data';
import useSWAPIData from '../hooks/useSWAPIData';
import '../css/flip-card.css';
import DefaultImage from '../img/logos/StarWarsLogo.png';

function Movies() {
	const { t } = useTranslation();
	const { data, isLoading, error } = useSWAPIData();
	const [movieData, setMovieData] = useState([]);
	const [moreMovieInfo, setMoreMovieInfo] = useState(false);
	const [MovieInfo, setMovieInfo] = useState([]);

	useEffect(() => {
		if (data && data.films) {
			setMovieData(data.films);
		}
	}, [data]);

	if (isLoading) {
		return <div>{t('loading')}</div>;
	} else if (error) {
		return <div>{t('error', { error })}</div>;
	}

	const handleMoreInfoClick = (movie) => {
		if (movie) {
			setMovieInfo(movie);
			setMoreMovieInfo(true);
		} else {
			setMoreMovieInfo(false);
			setMovieInfo([]);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center p-6 text-white'>
			{!moreMovieInfo ? (
				<>
					<h1 className='mb-5 text-3xl font-bold drop-shadow-lg'>
						{t('movies_title')}
					</h1>
					<div className='grid grid-cols-3 gap-4'>
						{movieData.map((movie, index) => (
							<div key={index} className='flip-card'>
								<div className='flip-card-inner'>
									<div className='flip-card-front'>
										<img
											src={movieImages[movie.title] || DefaultImage}
											alt={movie.title}
											className='movie-image'
										/>
									</div>
									<div className='flip-card-back'>
										<h2 className='text-yellow-400'>{movie.title}</h2>
										<p>
											{t('movies_release_date', {
												releaseDate: movie.release_date,
											})}
										</p>
										<p>{t('movies_director', { director: movie.director })}</p>
										<button
											className='p-2 mt-5 font-mono text-black bg-yellow-400 rounded-md'
											onClick={() => handleMoreInfoClick(movie)}
										>
											{t('movies_more_info')}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className='flex flex-col gap-5 p-6 bg-black bg-opacity-75 rounded-lg'>
					<div>
						<button
							className='p-2 mt-5 font-mono text-black bg-yellow-400 rounded-md'
							onClick={() => handleMoreInfoClick()}
						>
							{t('movies_back_to_movies')}
						</button>
					</div>
					<div className='flex gap-5'>
						<img
							src={movieImages[MovieInfo.title] || DefaultImage}
							alt={MovieInfo.title}
							className='flex-grow object-contain w-60'
						/>
						<div>
							<h1 className='text-4xl text-yellow-400 font-starwars'>
								{MovieInfo.title}
							</h1>
							<p className='text-xl'>
								<span className='text-yellow-400'>
									{t('movies_release_date')}:
								</span>{' '}
								{MovieInfo.release_date}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>{t('movies_director')}:</span>{' '}
								{MovieInfo.director}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>{t('movies_producer')}:</span>{' '}
								{MovieInfo.producer}
							</p>
							<p className='text-xl'>
								<span className='text-yellow-400'>
									{t('movies_opening_crawl')}:
								</span>{' '}
								{MovieInfo.opening_crawl}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Movies;
