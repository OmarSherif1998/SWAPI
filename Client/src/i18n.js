/** @format */

/** @format */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locals/en/translation.json';
import translationES from './locals/es/translation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	es: {
		translation: translationES,
	},
};

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources,
		fallbackLng: 'en',
		debug: true,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
