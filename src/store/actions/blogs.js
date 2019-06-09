import * as actionTypes from './actionTypes';

import axios from '../../axios-blog';

// common functions
export const formSubmitStart = _ => {
	return{
		type: actionTypes.FORM_SUBMIT_START
	}
}
export const formSubmitSuccess = _ => {
	return{
		type: actionTypes.FORM_SUBMIT_SUCCESS
	}
}
export const formSubmitFailed = err => {
	return {
		type:actionTypes.FORM_SUBMIT_FAIL,
		error: err
	}
}

// main page blogs
export const loadBlogs = _ => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog')
			.then( res => {
				dispatch(formSubmitSuccess())
				dispatch(setInitBlogs(res.data)) 
			})
			.catch( err => dispatch(formSubmitFailed(err)) )
	}
}

export const setInitBlogs = (data) => {
	return {
		type: actionTypes.LOAD_INIT_BLOGS_SUCCESS,
		blogs: data.blogs,
		about: data.about,
		cat: data.categories,
		tags: data.tags
	}
}
// my blogs
export const loadMyBlogs = _ => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog/myBlogs')
			.then( res => {
				dispatch(formSubmitSuccess());
				dispatch(loadMyBlogsSuccess(res.data));
			})
			.catch( err => dispatch(formSubmitFailed(err)) )
	}
}
const loadMyBlogsSuccess = data => {
	return {
		type: actionTypes.LOAD_MY_BLOGS_SUCCESS,
		myBlogs: data.blogs
	}
}

// search blogs
export const searchBlogs = searchString => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog/search',
			{ params: {
				searchTitle: searchString
				}
			}
		)
		.then( res => {
			dispatch(formSubmitSuccess())
			dispatch(searchBlogsSuccess(res.data)) 
		})
		.catch( err => dispatch(formSubmitFailed(err)) )
	}
}
export const searchTaggs = tagName => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog/search',
			{ params: {
				searchTag: tagName
				}
			}
		)
		.then( res => {
			dispatch(formSubmitSuccess())
			dispatch(searchBlogsSuccess(res.data)) 
		})
		.catch( err => dispatch(formSubmitFailed(err)) )
	}
}
export const searchCategory = catName => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog/search',
			{ params: {
				searchCategory: catName
				}
			}
		)
		.then( res => {
			dispatch(formSubmitSuccess())
			dispatch(searchBlogsSuccess(res.data)) 
		})
		.catch( err => dispatch(formSubmitFailed(err)) )
	}
}
const searchBlogsSuccess = data => {
	return {
		type: actionTypes.BLOG_SEARCH_SUCCESS,
		blogs: data
	}
}

export const getCategories = _ => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/blog/categories')
			.then( function(res) {
				dispatch(catSuccess(res.data));
				dispatch(formSubmitSuccess());
			})
			.catch( err => dispatch(formSubmitFailed(err)) )
	}
}
const catSuccess = data => {
	return {
		type: actionTypes.GET_CATEGORIES_SUCCESS,
		categories: data
	}
}

export const getAbout = id => {
	return dispatch => {
		dispatch(formSubmitStart());
		axios.get('api/about/'+id)
			.then( res => {
				dispatch(aboutSuccess(res.data));
				dispatch(formSubmitSuccess());
			})
			.catch( err => dispatch( formSubmitFailed(err)))
	}
}
const aboutSuccess = data => {
	return{
		type: actionTypes.LOAD_ABOUT_SUCCESS,
		about: data
	}
}
