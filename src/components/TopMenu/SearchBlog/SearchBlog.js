import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import { IconContext } from "react-icons";
import {IoIosSearch} from 'react-icons/io';

class SeachBlog extends React.Component {

	state={
		search: ''
	}

	onSearchChangeHandler = e => {
		this.setState({
			search : e.target.value
		})
	}
	onSearchBlogsHandler = _ => {
		if(this.state.search.trim() !== ''){
			this.props.onSearch(this.state.search);
		}
	}

	keyPressedHandler = e => {
		if(e.key === 'Enter' && e.target.value !== ''){
			this.props.onSearch(this.state.search);
		}
	}


	render(){
		return(
			<div className="Search">
				<input 
					type="text" 
					value={this.state.search} 
					onChange={this.onSearchChangeHandler} 
					onKeyPress={this.keyPressedHandler}
					placeholder="Search..." />
				<IconContext.Provider value={{ color: "gray" }}>
				  	<div onClick={this.onSearchBlogsHandler}>
					    <IoIosSearch className="IconSearch" />
					</div>
				</IconContext.Provider>
			</div>
		)
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onSearch : str => dispatch( actions.searchBlogs(str))
	}
}
export default connect(null,mapDispatchToProps)(SeachBlog);
