/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "(newSelectionPrefix|paginationText|renderMenuItemChildren)" }] */

import React, { useState } from 'react';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';

import { MODEL_TO_DISPLAY_NAME_MAP, MODEL_TO_ROUTE_MAP } from '../../utils/constants';

const URL_BASE = 'http://localhost:3002';

async function performFetch (url) {

	const response = await fetch(url, { mode: 'cors' });

	if (response.status !== 200) throw new Error(response.statusText);

	const searchResults = await response.json();

	return searchResults;

}

const SearchBar = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);

	const navigate = useNavigate();

	const handleSearch = async searchTerm => {

		setIsLoading(true);

		const url = `${URL_BASE}/api/search?searchTerm=${searchTerm}`;

		const searchResults = await performFetch(url);

		setOptions(searchResults);

		setIsLoading(false);

	};

	const handleChange = ([selectedOption]) => {

		if (selectedOption) {

			const { model, uuid } = selectedOption;

			const instancePath = `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`;

			navigate(instancePath);

		}

	};

	return (
		<AsyncTypeahead
			id='search-result-options'
			filterBy={() => true}
			delay={1000}
			isLoading={isLoading}
			labelKey='name'
			minLength={3}
			maxHeight={'200px'}
			onSearch={handleSearch}
			onChange={handleChange}
			options={options}
			placeholder='Search TheatreBase…'
			emptyLabel='No results found'
			renderMenuItemChildren={(option, { text }) => (
				<>
					<Highlighter search={text}>
						{option.name}
					</Highlighter>
					{' '}
					<span>
						({MODEL_TO_DISPLAY_NAME_MAP[option.model]})
					</span>
				</>
			)}
		/>
	);
};

export default SearchBar;
