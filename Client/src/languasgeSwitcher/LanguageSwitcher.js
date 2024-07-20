/** @format */
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className='flex gap-5 language-switcher '>
			<button
				className='hover:text-yellow-400 active:text-yellow-400'
				onClick={() => changeLanguage('en')}
			>
				English
			</button>
			<button
				className='hover:text-yellow-400 active:text-yellow-400'
				onClick={() => changeLanguage('es')}
			>
				Español
			</button>
		</div>
	);
};

export default LanguageSwitcher;
