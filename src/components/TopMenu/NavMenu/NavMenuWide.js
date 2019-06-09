import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

const navMenu = props => {
		let navs = (
			<ul>
				<li><Link to={'/about'} >About</Link></li>
				<li><Logo /></li>
				<li onClick={props.login}>Log In</li>
			</ul>
		);
		if(props.isAuthenticated){
			navs = (
				<ul>
					<li><Link to={'/'} >Home</Link></li>
					<li><Link to={'/about'} >About</Link></li>
					<li><Link to={'/new-blog'} >Write</Link></li>
					<li><Logo /></li>
					<li><Link to={'/myblogs'} >My Blogs</Link></li>
					<li><Link to={'/settings'} >Settings</Link></li>
					<li onClick={props.logout}>Log Out</li>
				</ul>
			)
		}

		return (
			<nav className="NavMenuWide">
				{navs}
			</nav>
		)
}

export default navMenu;
