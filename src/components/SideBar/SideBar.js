import React from 'react';

import Categories from './Categories/Categories';
import Tags from './Tags/Tags';
import AboutMe from './AboutMe/AboutMe';
import SearchBlog from '../TopMenu/SearchBlog/SearchBlog';

const sideBar = (props) => (
	<section className="SideBar">
		<aside className="SearchSideBar">
			<SearchBlog />
		</aside>
		<AboutMe 
			about={props.about}/>
		<Categories 
			categories={props.cat} 
			clicked={props.catClicked}/>
		<Tags 
			taggs={props.taggs} 
			clicked={props.tagClicked}/>
	</section>
);

export default sideBar;