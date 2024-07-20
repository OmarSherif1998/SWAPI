/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';

const CACHE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour in milliseconds

const useSWAPIData = () => {
	const [data, setData] = useState({ films: [], people: [], planets: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAndCacheData = async () => {
			try {
				const response = await axios.get('http://localhost:5000/getQuizData');
				const allData = response.data;
				console.log(allData);
				setData(allData);
				localStorage.setItem('quizData', JSON.stringify(allData));
				localStorage.setItem('quizDataTime', Date.now()); // Store the current time
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		const fetchData = async () => {
			try {
				const cachedData = localStorage.getItem('quizData');
				const cachedTime = localStorage.getItem('quizDataTime');

				if (cachedData && cachedTime) {
					const now = Date.now();
					if (now - cachedTime < CACHE_EXPIRATION_TIME) {
						setData(JSON.parse(cachedData));
						//console.log('here');
					} else {
						// Cache is expired, fetch new data
						await fetchAndCacheData();
					}
				} else {
					// No cached data, fetch new data
					//console.log('fetching new data...');
					await fetchAndCacheData();
				}
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	//console.log('quizData: ', data);
	return { data, isLoading, error };
};

export default useSWAPIData;
