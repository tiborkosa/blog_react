import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-blog';
import withErrorHandler from '../../hoc/withErrorHandler';

import * as actions from '../../store/actions';

import Input from '../../UI/Input/Input';
import Image from '../../UI/Image/Image';
import Coments from '../../components/Coments/Coments';
import Author from '../../components/Author/Author';
import Dialog from '../../UI/Dialog/Dialog';

import SocialMediaRow from '../../components/SocialMediaRow/SocialMediaRow';

class ReadBlog extends React.Component{

	constructor(props){
		super(props);
		this.state={
			myComment: '',
			numLikes: props.location.state.likes || 0,
			numComments: props.location.state.comments || 0,
		}
	}

	likeClickedHandler = () => {
		if(!this.props.userId) return alert('please sign in')
		const isLiked = this.props.isLiked;
		let numlikes = 0;
		if(!isLiked){
			this.props.like({blogid: this.props.blogId});
			numlikes=1;
		}
		else {
			this.props.removeLike(this.props.blogId);
			numlikes=-1;
		}
		this.setState({
			...this.state,
			numLikes: this.state.numLikes+numlikes
		})
	}

	loadCommentsClickedHandler = _ =>{
		const data={
			blogid: this.props.blogId,
			start: this.props.numCommentPage
		}
		this.props.loadComments(data);
	}
	commentChangeHandler = e => {
		this.setState({
			...this.state,
			myComment: e.target.value
		})
	}
	commentFormSubmitHandler = e => {
		e.preventDefault();
		if(this.state.myComment.trim() !== ''){
			const data = {
				blogid:this.props.blogId,
				comment:this.state.myComment.trim()
			}
			this.setState({
				...this.props,
				myComment: ''
			})
			this.props.addNewComment(data);
		}
	}
	componentDidMount(){
		this.props.getBlogData(this.props.match.params.id);
	}

	render(){
		let content = null;
		if(this.props.content.length > 0){
			content = this.props.content.map( (c, i) => {
				switch (c.type){
					case "img":
						return (
							<div className="ImgWrapper" key={i}>
								<Image name={c.value} />
							</div>)
							case "h5":
								return (<h5 key={i}>{c.value}</h5>)
					default:
						return (<p key={i}>{c.value}</p>)
				}
			});
		}
		let err = null;
		if(this.props.axiosError) {
			err = <Dialog err={this.props.axiosError} click={this.props.clearAxError} />
		}
		return(
			<div className="ReadBlog">
				{err}
				<h1>{this.props.title}</h1>
				<div className="ReadContent">{content}</div>
				<Author 
					firstname={this.props.location.state.author.first_name} 
					lastname={this.props.location.state.author.last_name} 
					image={this.props.location.state.author.image} />
				<SocialMediaRow
					wasLiked={this.props.isLiked}
					like={this.likeClickedHandler}
					numberOfLikes={this.state.numLikes}
					numberOfComments={this.state.numComments}
					comment={this.loadCommentsClickedHandler}
					share={this.shareClickedHandler} />
				
				<Coments 
					coments={this.props.commentsList || []}
					remove={this.props.deleteComment}
					edit={this.props.editComment}
					theBoss={this.props.userId || ''}
					loadMoreComments={this.loadCommentsClickedHandler} />
				
				<form onSubmit={this.commentFormSubmitHandler}>
					<Input
						type='text'
						disabled={this.props.userId ? false: true}
						value={this.state.myComment} 
						placeholder={this.props.userId ? "Comment here" : "Please log in first"}
						onChange={ (e) => this.commentChangeHandler(e)} />
					<button disabled={this.props.userId ? false: true} type="submit">Submit</button>
				</form>
			</div>
		)	
	}
} 

const mapStateToProps = state => {
	return {
		userId: state.authReducer.user,
		blogId:state.singleBlogReducer.id,
		title:state.singleBlogReducer.title,
		description:state.singleBlogReducer.description,
		tags: state.singleBlogReducer.tags,
		categories: state.singleBlogReducer.categories,
		content: state.singleBlogReducer.content,
		isThereMoreComments: state.singleBlogReducer.isMoreComments,
		numCommentPage: state.singleBlogReducer.commentPage,
		commentsList: state.singleBlogReducer.comments,
		isLiked: state.singleBlogReducer.isLiked
	}
}

const mapDispatchToProps = dispatch => {
	return {
	  getBlogData: id => dispatch( actions.getReadBlog(id)),
	  like: id => dispatch(actions.likeBlog(id)),
	  removeLike: id => dispatch(actions.removeLikeBlog(id)),
	  loadComments: data => dispatch(actions.loadComments(data)),
	  addNewComment: data => dispatch(actions.addBlogComment(data)),
	  editComment: data => dispatch(actions.editBlogComment(data)),
		deleteComment: id => dispatch(actions.deleteBlogComment(id)),
		logout : _ => dispatch(actions.logOut())
	}
}

export default connect(
	mapStateToProps, 
    mapDispatchToProps)(withErrorHandler(ReadBlog, axios));
