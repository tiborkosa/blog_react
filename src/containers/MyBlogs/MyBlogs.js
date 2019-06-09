import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-blog';
import MasonryLayout from '../../Layout/MasonryLayout';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import Confirm from '../../UI/Confirm/Confirm';

import Dialog from '../../UI/Dialog/Dialog';

class MyBlogs extends React.Component {

	state = {
		axiosError: false,
		column: 1,
		deleteId: ''
	}

	checkWidth = _ => {
		let col = 1;
		if(window.innerWidth > 500){
			col = 2;
		} 
		if(window.innerWidth > 1000){
			col = 3;
		} 
		this.setState({
			...this.state,
			column : col
		});
	}
	handleAxiosError = e => {
        e.stopPropagation();
        this.setState({
			...this.state,
            axiosError: true
        })
        this.props.signIn()
	}
   
    componentDidMount(){
		console.log("[MyBlog] component did mount")
		this.props.onMyBlogsLoaded();
		this.checkWidth();
		window.addEventListener("resize", this.checkWidth.bind(this));
	}
	componentWillUnmount(){
        window.removeEventListener("resize",this.checkWidth)
	}
	deleteBlogHandler = id => {
		this.setState({
			...this.state,
			deleteId : id
		})
	}
	confirmDeleteHandler = _ => {
		this.clearMessageHandler();
		this.props.deleteBlog(this.props.history.push, this.state.deleteId);
	}
	clearMessageHandler = _ => {
		this.setState({
			...this.state,
			deleteId : ''
		})
	}

    render(){
		let confMessage = null;
		if(this.state.deleteId){
			confMessage = (<Confirm 
				message="Are you sure you want to delet it?" 
				confirm={this.confirmDeleteHandler} 
				cancel={this.clearMessageHandler}/>)
		}
		let axError = null;
        if(this.props.axiosError === 'logout' && !this.state.axiosError){
            axError = <Dialog click={ e => this.handleAxiosError(e)} err="Your session expired!<B> Please log in." />
		}
		
		if(this.props.axiosError === 'logout'){
			this.props.logout()
		}
        let spinner = null;
		if(this.props.loading){
			spinner = <Spinner />;
		}
		let blogList = <p>You haven't posted anything yet!</p>;
		if(this.props.blogs.length > 0){
			blogList = <MasonryLayout 
				column={this.state.column}
                blogs={this.props.blogs} 
                isMine={true} 
                deleteBlog={this.deleteBlogHandler}
				editBlog={this.props.editBlog}
				hisPush={this.props.history.push}/>
		}
		return(
			<Aux>
				{axError}
				{spinner}
				{blogList}
				{confMessage}
			</Aux>
        )
    }
}
const mapStateToProps = state => {
	return {
		blogs: state.blogReducer.blogs,
		loading: state.common.loading,
        error: state.common.error,
        user: state.authReducer.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onMyBlogsLoaded: _ => dispatch( actions.loadMyBlogs()),
		deleteBlog: (history,blogId) => dispatch( actions.deleteBlog(history, blogId)),
		editBlog: (history, blogId ) => dispatch(actions.getBlog(history,blogId)),
		logout : _ => dispatch(actions.logOut())
	}
}

export default connect(
	mapStateToProps, 
    mapDispatchToProps)(withErrorHandler(MyBlogs, axios));
    