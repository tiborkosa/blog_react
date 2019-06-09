import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-blog';
import withErrorHandler from '../../hoc/withErrorHandler';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Image from '../../UI/Image/Image';
import Select from '../../UI/Select/Select';
import Dialog from '../../UI/Dialog/Dialog';
import Confirm from '../../UI/Confirm/Confirm';

import {IoIosCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";

import * as actions from '../../store/actions';

class CreateBlog extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			id: props.id || '',
			title:props.title || '',
			description:props.description || '',
			tags: props.tags || [],
			categories: props.mainCategories || [],
			selectedCategories: props.selectedCategories || [], 
			content: props.content || [],
			tag: '',
			uploading: false,
			error: '',
			deletedFiles: [],
			axiosError: false,
			confirmMessage : ''
		}
		const q = new URLSearchParams(props.location.search)
		if(q.get('editable') && props.id === '' ){ 
			props.history.push('/newblog')
		} 
	}

	// map the current category state with the redux state
	static getDerivedStateFromProps(nextprops, prevprops){
		if(nextprops.mainCategories.length > 0 && prevprops.categories.length === 0 ){
			return { categories: nextprops.mainCategories}
		} else return null;
	}

	componentDidMount(){
		if(!this.props.mainCategories || this.props.mainCategories.length === 0){
			this.props.loadCategories()
		}
	}

	titleChangeHandler = (e) => {
		this.setState({
			...this.state,
			title : e.target.value
		})
	}
	descriptionChangeHandler = (e) => {
		this.setState({
			...this.state,
			description: e.target.value
		})
	}
	contentChangeHandler = (e, i) => {
		let updatedContent = this.state.content.slice();
		let element = {...updatedContent[i]};
		element.value = e.target.value;
		updatedContent[i]=element;
		this.setState({
			...this.state,
			content:updatedContent
		})
	}
	updateContentFile = (name, i) => {
		let updatedContent = [...this.state.content];
		let newContent = {type:'img',value:name };
		updatedContent[i]=newContent;
		this.setState({
			...this.state,
			uploading: false,
			content:updatedContent
		})
	}

	catChangeHandler = (e) => {
		const i = +e.target.selectedIndex -1;
		const categs = this.state.categories.map( (el, ii) => {
			if(i === ii) el.disabled = true;
			return el;
		})
		this.setState({
			...this.state,
			categories: categs,
			selectedCategories : [...this.state.selectedCategories, e.target.value]
		})
	}
	keyPressedHandler = (e) => {
		if(e.key === 'Enter'){
			let newTag = e.target.value;
			if(newTag[0] === '#'){
				newTag = newTag.substring(1);
			}
			if(this.state.tags.indexOf(newTag) >= 0) {
				this.setError('Tag already exist!');
				return;
			}
			
			this.setState({
				...this.state,
				tag: '',
				tags: [...this.state.tags, newTag.replace(' ', '')]
			})
		}
	}
	tagChangeHandler = (e) => {
		this.setState({
			...this.state,
			tag : e.target.value
		})
	}
	addElementHandler = (el) => {
		let lastElement = [...this.state.content].pop();
		if(lastElement && (lastElement.type === 'file' || lastElement.value.trim() === '') ){
			this.setError('Please complete the last added field!')
			return false;
		}
		this.setState({
			...this.state,
			content: [...this.state.content, {type:el,value:''}]
		})
	}
	removeTag = (e,idx) => {
		let taggs = this.state.tags.filter( (el,i) => i!==idx);
		this.setState({
			...this.state,
			tags: taggs
		})
	}
	removeCat = (e,idx) => {
		const catName = this.state.selectedCategories[idx];
		const categs = this.state.categories.map( el => {
			if(el.name === catName) el.disabled = false;
			return el;
		})
		let selCategs = this.state.selectedCategories.filter( (el,i) => i!==idx);
		this.setState({
			...this.state,
			categories: categs,
			selectedCategories: selCategs
		})
	}
	constentRemoveHandler = (e, idx) => {
		let updatedContent = this.state.content.filter( (el,i) => i!==idx);
		this.setState({
			...this.state,
			content: updatedContent
		})
	}

	onBlogSave = publish => {
		const blogData = this.getBlogData(publish);
		if(!this.validateForm()){
			return false;
		}
		if(!this.state.id){
			return this.props.onSaveBlog(this.props.history.push, blogData);
		} else {
			return this.props.onEditBlog(this.props.history.push ,blogData);
		}
	}

	validateForm = _ => {
		let element = this.state.title.trim();
		if(element === '') {
			this.setError("Title is missing!");
			 return false;
		}
		element = this.state.description.trim();
		if(element === '') {
			this.setError("Description is missing!");
			return false;
	   }
	   element = this.state.content;
	   let image = false;
	   let message = '';
	   element.forEach( el => {
		   if(el.type === 'file'){
			message = "Please upload an image!";
			return false;
		   }
		   if(el.type === 'img'){image = true}
		   if(el.value.trim() === ''){
			   message = "Please complete the blog content!"
		   }
	   })
	   if(message !== ''){
			this.setError(message);
		   return false;
	   }
	   if(!image){
		 		this.setError("Please upload at least one image!");
		   return false;
	   }
	   return true;
	}
	getBlogData = publishing => {
		return {
			id: this.state.id,
			author: this.props.userId, 
			title: this.state.title, 
			desc: this.state.description, 
			body: this.state.content, 
			image: this.getFirstImage(), 
			tags: this.state.tags,
			categories: this.state.selectedCategories,
			deletedFiles: this.state.deletedFiles,
			publish: publishing
		}
	}
	getFirstImage = _ => {
		const images = this.state.content.filter( el => el.type === 'img');
		if(images.length > 0) return images[0].value;
		return '';
	}
	clearConfirmMessage = _ => {
		this.setState({
			...this.state,
			confirmMessage: ''
		})
	}
	deleteBlog = _ => {
		if(this.state.id){
			this.props.onDeleteBlog(this.state.id)
		} else{
			this.props.history.push('/myBlogs');
		}
	}
	onDeleteBlogHandler = _ => {
		this.setState({
			...this.state,
			confirmMessage: 'Are you sure You want to delete this blog?'
		})
	}
	fileUploadHandler = (e, idx) => {
		const files = Array.from(e.target.files);
		if(files.length > 1) {
			this.setError("Only one file allowed!");
			return;
		}
		const formData = new FormData()
		files.forEach((file, i) => {
			formData.append(i, file)
		});

		this.setLoading();

		axios
			.post('api/blog/image/single_upload', formData)
			.then( res => {
				this.updateContentFile(res.data.filename, idx);
			 })
			.catch( err => this.setError(err))
	}
	fileDeleteHandler = idx => {
		// delete should be handled internally
		// create a list here and pass it in on save/edit
		this.setState({
			...this.state,
			deletedFiles: [...this.state.deletedFiles, this.state.content[idx].value]
		})
	}

	setError = err => {
		this.setState({
			...this.state,
			uploading: false,
			error: err
		})
	}
	setLoading = _ => {
		this.setState({ 
			...this.state,
			uploading: true 
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
	handleMessage = e => {
		e.stopPropagation();
		this.setState({
			...this.state,
			error: ''
	})
	}

	render(){
		let axError = null;
		if(this.props.axiosError === 'logout' && !this.state.axiosError){
				axError = <Dialog click={ e => this.handleAxiosError(e)} err="Your session expired!<B> Please log in." />
		}
		let message = null;
		if(this.state.error){
			message = <Dialog click={this.handleMessage} err={this.state.error}/>
		}	
		let confirm = null;
		if(this.state.confirmMessage){
			confirm = (<Confirm 
				title="Confirm" 
				message={this.state.confirmMessage} 
				confirm={this.deleteBlog} 
				cancel={this.clearConfirmMessage} />);
		}
		let taggs = null;
		if(this.state.tags.length > 0){
			taggs = this.state.tags.map( (tag, idx) => {
				return (
					<div key={'t'+idx}>
						<IconContext.Provider value={{ color: "#f55b5b" }}>
						  <div onClick={(e)=>this.removeTag(e,idx)}>
						    <IoIosCloseCircle className="icon"/>
						  </div>
						</IconContext.Provider>
						<span>#{tag}</span>
					</div>
				);	
			});	
		} 
		let selCategories = this.state.selectedCategories.map( 
				(cat,idx) => {
					return (
						<div key={'c'+idx}>
							<IconContext.Provider value={{ color: "#f55b5b" }}>
							  <div onClick={(e)=>this.removeCat(e,idx)}>
							    <IoIosCloseCircle className="icon"/>
							  </div>
							</IconContext.Provider>
							<span>{cat}</span>
						</div>
					);
				}
			);	
		let content = (<p>Please use the buttons to add content</p>);
		if(this.state.content.length > 0){
			content = this.state.content.map( (c, i) => {
				switch(c.type){
					case 'textarea':
						return (
							<div key={i} className="clearFix">
								<Input
									type='textarea'
									value={c.value} 
									placeholder="Content"
									onChange={ (e) => this.contentChangeHandler(e,i)} />
								<button className="RemoveButton" onClick={(e) => this.constentRemoveHandler(e,i)}>Remove</button>
							</div>
							)
					case 'img':
						return (
							<div key={i} className="clearFix">
								<Image name={c.value} />
								<button className="RemoveButton" onClick={(e) => this.constentRemoveHandler(e,i)}>Remove</button>
							</div>
							)
					case 'file':
						return (
							<div key={i} className="clearFix">
								<Input
									type='file' 
									name="file"
									value='' 
									placeholder=''
									onChange={(e) => this.fileUploadHandler(e,i)} />
								<button className="RemoveButton" onClick={(e) => this.constentRemoveHandler(e,i)}>Remove</button>
							</div>
							)
					default:
						return (
							<div key={i} className="clearFix">
								<Input
									key={i}
									type='text' 
									name="subtitle"
									value={c.value} 
									placeholder='Subtitle'
									onChange={(e) => this.contentChangeHandler(e,i)} />
								<button className="RemoveButton" onClick={(e) => this.constentRemoveHandler(e,i)}>Remove</button>
							</div>
							)
				}
			});
		}
		return(
			<div className="CreateBlog">
				{axError}
				{message}
				{confirm}
				<div>
					<h4>The main part</h4>
					<Input 
						type='text' 
						value={this.state.title} 
						placeholder='Title of your blog'
						name="title"
						onChange={this.titleChangeHandler} />
					<Input 
						type='text' 
						name="description"
						value={this.state.description} 
						placeholder='Short description for the main page'
						onChange={this.descriptionChangeHandler} />
				</div>
				<div className="ContentBody">
					<h4>Blog Content</h4>
					<div>
						<div className="ButtonGroup">
							<Button 
								clicked={ () => this.addElementHandler('h5')}
								styleClass='addBtn'>
								+ Subtitle
							</Button>
							<Button 
								clicked={ () => this.addElementHandler('textarea')}
								styleClass='addBtn'>
								+ Paragraph
							</Button>
							<Button 
								clicked={ () => this.addElementHandler('file')}
								styleClass='addBtn'>
								+ Image
							</Button>
						</div>
					</div>
					<div>{content}</div>
				</div>
				<div className="tagsCats">
					<h4>Tags and Categories</h4>
					<section>
						<Select 
							changed={this.catChangeHandler}
							initValue="Add categories"
							options={this.state.categories}/>
						<div className="AddedItems">
							{selCategories}
						</div>
					</section>
					<section>
						<Input 
							type="text" 
							name="tag"
							value={this.state.tag}
							placeholder="Add tags"
							onChange={this.tagChangeHandler}
							onKeyPress={this.keyPressedHandler} />
						<div className="AddedItems">
							{taggs}
						</div>
					</section>
				</div>
				
				<div className="ButtonGroup BottomForm">
					<Button 
						clicked={this.onDeleteBlogHandler}
						styleClass='delete'>
						Delete
					</Button>
					<Button
						clicked={() => this.onBlogSave(false)} 
						styleClass='submit'>
						Save
					</Button>
					<Button 
						clicked={() => this.onBlogSave(true)} 
						styleClass='publish'>
						Publish
					</Button>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		userId: state.authReducer.user,
		id:state.singleBlogReducer.id,
		title:state.singleBlogReducer.title,
		description:state.singleBlogReducer.description,
		tags: state.singleBlogReducer.tags,
		mainCategories: state.blogReducer.categories,
		selectedCategories: state.singleBlogReducer.categories,
		content: state.singleBlogReducer.content
	}
}

const mapDispatchToProps = dispatch => {
	return {
  	onSaveBlog: (history, data) => dispatch( actions.saveBlog(history, data)),
		onEditBlog: (history, data) => dispatch( actions.editBlog(history, data)),
		onDeleteBlog: blogId => dispatch( actions.deleteBlog(blogId)),
		loadCategories: _ => dispatch( actions.getCategories()),
		signIn : _ => dispatch(actions.showSignInClick())
	}
}

export default connect(
	mapStateToProps, 
    mapDispatchToProps)(withErrorHandler(CreateBlog, axios));
