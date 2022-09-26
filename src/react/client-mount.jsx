import { fromJS } from 'immutable';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import reducers from '../redux/reducers';

window.onload = () => {

	const preloadedState = JSON.parse(document.getElementById('react-client-data').innerText);

	const loggerMiddleware = createLogger({ stateTransformer: state => state.toJS() });

	const store = createStore(
		combineReducers(reducers),
		fromJS(preloadedState),
		applyMiddleware(...[thunkMiddleware, loggerMiddleware])
	);

	hydrateRoot(
		document.getElementById('page-container'),
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);

};
