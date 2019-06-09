import * as actionTypes from './actionTypes';

import axios from '../../axios-blog';

// common functions
const submitFormStart = _ => {
	return {
		type: actionTypes.FORM_SUBMIT_START
	}
}
const submitFormFail = err => {
	return {
		type: actionTypes.FORM_SUBMIT_FAIL,
		error: err
	}
}
const submitFormSuccess = _ => {
	return {
		type: actionTypes.FORM_SUBMIT_SUCCESS
	}
}
// save blog
export const saveBlog = (push, data) => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.post('api/blog', data)
			.then( res => {
				dispatch(submitFormSuccess());
				push('/myblogs'); 
			 })
			.catch( err => {
				dispatch(submitFormFail(err)) 
			})
	}
}

// publish/ update blog
export const editBlog = (push, data) => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.put('api/blog/'+ data.id, data)
			.then( async res => {
				await dispatch(submitFormSuccess());
				push('/myblogs');
			 })
			.catch( err => {
				dispatch(submitFormFail(err)) 
			})
	}
}

// delete blog
export const deleteBlog = (push, id ) => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.delete('api/blog/'+id)
			.then( async res => {
				dispatch(submitFormSuccess());
				await dispatch(deleteBlogsSuccess(res.data)) ;
				push('/myblogs'); 
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const deleteBlogsSuccess = data => {
	return {
		type: actionTypes.DELETE_BLOGS_SUCCESS,
		deletedId: data
	}
}

// get one blog
// call this from myBlogs
export const getBlog = (push, id) => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.get('api/blog/'+id)
			.then( async function(res) {
				await dispatch(getBlogSuccess(res.data));
				dispatch(submitFormSuccess());
				push('/editblog?editable=true'); 
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
export const getReadBlog = id => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.get('api/blog/'+id)
			.then( res => {
				dispatch(getBlogSuccess(res.data));
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const getBlogSuccess = data => {
	return {
		type: actionTypes.GET_BLOG_SUCCESS,
		blog: data.blogData
	}
}

// likes
export const likeBlog = data => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.post('api/blog/like', data)
			.then( res => {
				//dispatch(likeBlogSuccess());
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
export const removeLikeBlog = id => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.delete('api/blog/like/'+id)
			.then( res => {
				//dispatch(removeLikeBlogSuccess());
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}

// comment
/*
data {
	blogid:,
	start
}
*/
export const loadComments = data => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.get(`api/blog/comment?blogid=${data.blogid}&start=${data.start}`)
			.then( res => {
				dispatch(commentsLoadSuccess(res.data,data.start));
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const commentsLoadSuccess = (data, pagenum) => {
	return {
		type: actionTypes.LOAD_COMMENTS_SUCCESS,
		page: pagenum,
		isLast: data.length < 10,
		comments: data
	}
}
export const addBlogComment = data => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.post('api/blog/comment', data)
			.then( res => {
				dispatch(commentAddedSuccess(res.data));
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const commentAddedSuccess = data => {
	return {
		type: actionTypes.ADD_COMMENT_SUCCESS,
		comment: data
	}
}
// edit
export const editBlogComment = data => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.put('api/blog/comment/'+data.id, data)
			.then( res => {
				dispatch(commentEditSuccess(res.data));
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const commentEditSuccess = data => {
	return {
		type: actionTypes.UPDATE_COMMENT_SUCCESS,
		comment: data
	}
}
//delete
export const deleteBlogComment = id => {
	return dispatch => {
		dispatch(submitFormStart());
		axios.delete('api/blog/comment/'+id)
			.then( res => {
				dispatch(commentDeletedSuccess(res.data));
				dispatch(submitFormSuccess());
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
const commentDeletedSuccess = data => {
	return {
		type: actionTypes.REMOVE_COMMENT_SUCCESS,
		deleted: data
	}
}
