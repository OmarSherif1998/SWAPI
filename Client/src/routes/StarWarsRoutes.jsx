/** @format */

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Quiz from '../pages/Quiz';
import Characters from '../pages/Characters';
import Movies from '../pages/Movies';
import Planets from '../pages/Planets';
import SearchResult from '../pages/SearchResult';

function StarWarsRoutes() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Navigate to='/quiz' />}></Route>
				<Route path='/quiz' element={<Quiz />}></Route>
				<Route path='/characters' element={<Characters />}></Route>
				<Route path='/movies' element={<Movies />}></Route>
				<Route path='/planets' element={<Planets />}></Route>
				<Route path='/searchResult' element={<SearchResult />}></Route>
			</Routes>
		</div>
	);
}

export default StarWarsRoutes;
