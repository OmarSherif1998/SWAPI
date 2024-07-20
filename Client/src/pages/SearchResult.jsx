/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CharacterSearchComponent from '../components/CharacterSearchComponent';
import FilmSearchComponent from '../components/FilmSearchComponent';
import PlanetSearchComponent from '../components/PlanetSearchComponent';
function SearchResult() {
	const location = useLocation();
	const [dataType, setDataType] = useState('');
	const getQueryParams = () => {
		const query = new URLSearchParams(location.search);
		// Get the 'query' parameter
		const params = query.get('query');
		return params ? JSON.parse(decodeURIComponent(params)) : [];
	};

	const result = getQueryParams();

	useEffect(() => {
		if (result[0].url.includes('people')) {
			setDataType('people');
		} else if (result[0].url.includes('films')) {
			setDataType('films');
		} else {
			setDataType('planets');
		}
	}, [result]);

	switch (dataType) {
		case 'people':
			return (
				<div className='flex justify-center p-5 mb-5'>
					<CharacterSearchComponent data={result} />
				</div>
			);

		case 'films':
			return (
				<div className='flex justify-center p-5 mb-5'>
					<FilmSearchComponent data={result} />
				</div>
			);

		case 'planets':
			return (
				<div className='flex justify-center p-5 mb-5'>
					<PlanetSearchComponent data={result} />
				</div>
			);

		default:
			return null;
	}
}

export default SearchResult;
