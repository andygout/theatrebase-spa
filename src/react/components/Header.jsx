import React from 'react';
import { Link } from 'react-router-dom';

import { SearchBar } from '.';

const Header = () => {

	return (
		<header className="header">

			<Link to={'/'} className="header__component header__home-link">
				TheatreBase
			</Link>

			<div className="header__component">
				<SearchBar />
			</div>

		</header>
	);

};

export default Header;
