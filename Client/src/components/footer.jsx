/** @format */

import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();
	const currentYear = new Date().getFullYear();

	return (
		<footer className='flex flex-col justify-between w-full h-auto p-4 bg-gray-900'>
			<div className='flex justify-around text-yellow-500'>
				<div>
					<h3 className='font-bold'>{t('footer_column_1_title')}</h3>
					<ul className='pl-5 list-disc'>
						<li>{t('footer_point_1')}</li>
						<li>{t('footer_point_2')}</li>
						<li>{t('footer_point_3')}</li>
						<li>{t('footer_point_4')}</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold'>{t('footer_column_2_title')}</h3>
					<ul className='pl-5 list-disc'>
						<li>{t('footer_point_1')}</li>
						<li>{t('footer_point_2')}</li>
						<li>{t('footer_point_3')}</li>
						<li>{t('footer_point_4')}</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold'>{t('footer_column_3_title')}</h3>
					<ul className='pl-5 list-disc'>
						<li>{t('footer_point_1')}</li>
						<li>{t('footer_point_2')}</li>
						<li>{t('footer_point_3')}</li>
						<li>{t('footer_point_4')}</li>
					</ul>
				</div>
			</div>
			<div className='text-sm text-center text-gray-600'>
				{t('footer_rights', { year: currentYear })}
			</div>
		</footer>
	);
};

export default Footer;
