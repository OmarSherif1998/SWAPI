/** @format */

import React from 'react';

const Footer = () => {
	return (
		<footer className='flex flex-col justify-between w-full h-auto p-4 bg-gray-900 '>
			<div className='flex justify-around text-yellow-500'>
				<div>
					<h3 className='font-bold'>Column 1</h3>
					<ul className='pl-5 list-disc'>
						<li>Point 1</li>
						<li>Point 2</li>
						<li>Point 3</li>
						<li>Point 4</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold'>Column 2</h3>
					<ul className='pl-5 list-disc'>
						<li>Point 1</li>
						<li>Point 2</li>
						<li>Point 3</li>
						<li>Point 4</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold'>Column 3</h3>
					<ul className='pl-5 list-disc'>
						<li>Point 1</li>
						<li>Point 2</li>
						<li>Point 3</li>
						<li>Point 4</li>
					</ul>
				</div>
			</div>
			<div className='text-sm text-center text-gray-600'>
				&copy; {new Date().getFullYear()} Omar Sherif. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
