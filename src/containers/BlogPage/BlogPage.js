import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-blog';
import SideBar from '../../components/SideBar/SideBar';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions';
import Spinner from '../../UI/Spinner/Spinner';
import MasonryLayout from '../../Layout/MasonryLayout';

import withErrorHandler from '../../hoc/withErrorHandler';

class BlogPage extends React.Component {
	constructor(props){
		super(props);
		let expTime = localStorage.getItem('tblogExpTime');
    	if(expTime && Date.now() > new Date(expTime)) {
    		this.props.logout();
    	}
	}
	
	state = {
		column : 1
	}
	/* NEED to add paging eventually  */
	componentDidMount(){
		this.props.onLoaded();
		this.checkWidth();
		window.addEventListener("resize", this.checkWidth.bind(this));
	}
	checkWidth = _ => {
		let col = 1;
		if(window.innerWidth > 500){
			col = 2;
		} 
		this.setState({
			column : col
		});
	}
    componentWillUnmount(){
        window.removeEventListener("resize",this.checkWidth)
	}

	render(){
		if(this.props.axiosError === 'logout'){
			this.props.logout()
		}
		let spinner = null;
		if(this.props.loading){
			spinner = <Spinner />;
		}
		let blogs = <p>Nothing was posted yet!</p>;
		if(this.props.blogs.length > 0){
			blogs = (<MasonryLayout column={this.state.column} blogs={this.props.blogs}/>)
		}
		return(
			<Aux>
				<h3 className="BlogPageTitle">Share your voice, read a voice</h3>
				{spinner}
				{blogs}
				<SideBar 
					taggs={this.props.taggs} 
					tagClicked={this.props.onTagSelected}
					cat={this.props.cat} 
					catClicked={this.props.onCategorySelected}
					about={this.props.about} />
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		blogs: state.blogReducer.blogs,
		loading: state.common.loading,
		cat: state.blogReducer.categories,
		taggs: state.blogReducer.tags,
		about: state.blogReducer.about,
		error: state.common.error,
		token: state.authReducer.tokenId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLoaded: _ => dispatch( actions.loadBlogs()),
		onTagSelected: taggName => dispatch( actions.searchTaggs(taggName)),
		onCategorySelected: catName => dispatch( actions.searchCategory(catName)),
		onBlogSearch: searchString => dispatch( actions.searchBlogs(searchString)),
		logout : _ => dispatch(actions.logOut())
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps)(withErrorHandler(BlogPage, axios));
