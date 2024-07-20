/** @format */

// ssr.js
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import App from '../Client/src/pages/App.js';

const renderApp = (url, context) => {
	return renderToString(
		<StaticRouter location={url} context={context}>
			<App />
		</StaticRouter>
	);
};

export default renderApp;
