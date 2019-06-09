import React from 'react';

import Logo from './Logo/Logo';
import SearchBlog from './SearchBlog/SearchBlog';
import MenuIcon from '../../UI/MenuIcon/MenuIcon';

const topMenu = props => (
		<div className="TopMenu" onClick={e => props.click(e)}>
			<Logo />
			<SearchBlog />
			<div >
				<MenuIcon active={props.active}/>
			</div>
		</div>
	);

export default topMenu;
