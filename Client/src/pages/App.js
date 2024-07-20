/** @format */

import Footer from '../components/footer';
import Navbar from '../components/navbar';
import bg from '../img/background/Sw.jpg';

import StarWarsRoutes from '../routes/StarWarsRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div
				className='flex flex-col min-h-screen '
				style={{ backgroundImage: `url(${bg})`, backgroundSize: 'contain' }}
			>
				<Navbar />
				<div className='flex-grow pt-16'>
					<StarWarsRoutes />
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
