/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSWAPIData from '../hooks/useSWAPIData';
// import LanguageSwitcher from '../locals/languasgeSwitcher/LanguageSwitcher';

const Navbar = () => {
	const location = useLocation();
	const { data, isLoading, error } = useSWAPIData();
	const [hideSearch, setHideSearch] = useState(false);
	const navigate = useNavigate();
	const [films, setFilms] = useState([]);
	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [searchPlaceholder, setSearchPlaceholder] = useState('Search..');
	const [searchValue, setSearchValue] = useState('');
	const [searchData, setSearchData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);

	// const dropdownRef = useRef(null);

	useEffect(() => {
		if (data) {
			const {
				films: filmsData,
				people: peopleData,
				planets: planetsData,
			} = data;
			setFilms(filmsData);
			setPeople(peopleData);
			setPlanets(planetsData);
		}

		switch (location.pathname) {
			case '/characters':
				setSearchPlaceholder('Search a character');
				setSearchData(people);
				setHideSearch(false);
				break;
			case '/movies':
				setSearchPlaceholder('Search a movie');
				setSearchData(films);
				setHideSearch(false);
				break;
			case '/planets':
				setSearchPlaceholder('Search a planet');
				setSearchData(planets);
				setHideSearch(false);
				break;
			case '/quiz':
				setHideSearch(true);
				break;
			case '/searchResult':
				setHideSearch(true);
				break;
			default:
				setSearchPlaceholder('Search...');
				break;
		}
		setSearchValue('');
	}, [location.pathname, data, films, people, planets]);

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
	// 			setShowDropdown(false);
	// 		} else {
	// 			setShowDropdown(true);
	// 		}
	// 	};

	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchValue(value);

		if (value) {
			const results = searchData?.filter((item) => {
				const searchTerm = item.name || item.title || '';

				return searchTerm?.toLowerCase().includes(value.toLowerCase());
			});
			setFilteredData(results);
			setShowDropdown(results.length > 0);
		} else {
			setFilteredData([]);
			setShowDropdown(false);
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		// Serialize filteredData to JSON
		const serializedParams = JSON.stringify(filteredData);
		// Navigate with serialized data as a query parameter
		navigate(`/searchResult?query=${encodeURIComponent(serializedParams)}`);
		console.log('Searching for:', searchValue);
	};

	const handleDropdownItemClick = (item) => {
		setSearchValue(item.name || item.title || '');
		setFilteredData([item]);
		setShowDropdown(false);
	};

	return (
		<nav className='flex items-center justify-between p-4 text-white bg-gray-900 rounded-xl'>
			<div className='text-2xl font-bold tracking-widest'>Star Wars</div>
			<ul className='flex space-x-4'>
				<li>
					<Link to={'/quiz'} className='hover:text-yellow-400'>
						Quiz
					</Link>
				</li>
				<li>
					<Link to={'characters'} className='hover:text-yellow-400'>
						Characters
					</Link>
				</li>
				<li>
					<Link to={'movies'} className='hover:text-yellow-400'>
						Movies
					</Link>
				</li>
				<li>
					<Link to={'planets'} className='hover:text-yellow-400'>
						Planets
					</Link>
				</li>
			</ul>
			{!hideSearch ? (
				<div className='relative flex items-center'>
					<input
						type='text'
						placeholder={searchPlaceholder}
						value={searchValue}
						onChange={handleInputChange}
						className='p-2 text-white placeholder-gray-400 bg-gray-800 rounded'
					/>
					<button
						className='px-4 py-2 ml-2 text-black bg-yellow-500 rounded hover:bg-yellow-600'
						onClick={handleSearch}
					>
						Search
					</button>
					{showDropdown && filteredData.length > 0 && (
						<div className='absolute left-0 w-full mt-2 overflow-y-auto text-white bg-gray-800 rounded-md shadow-lg top-full max-h-60'>
							{filteredData.map((item, index) => (
								<div
									key={index}
									className='p-2 cursor-pointer hover:bg-gray-700'
									onClick={() => handleDropdownItemClick(item)}
								>
									{item.name || item.title}
								</div>
							))}
						</div>
					)}
				</div>
			) : null}
			{/* <LanguageSwitcher /> */}
		</nav>
	);
};

export default Navbar;
