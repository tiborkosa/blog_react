import * as actionTypes from '../actions/actionTypes';

// separate the states
const initialState = {
	blogs : [],
	tags : [],
	categories: [],
	about:null
}

const reducer = (state=initialState, action) => {
	switch ( action.type ) {
		case actionTypes.LOAD_INIT_BLOGS_SUCCESS:
			return {
				...state,
				blogs: action.blogs,
				tags : action.tags,
				categories: action.cat,
				about:action.about
			}
		case actionTypes.BLOG_SEARCH_SUCCESS:
			return {
				...state,
				blogs: action.blogs,
				loading: false
			}
		case actionTypes.LOAD_MY_BLOGS_SUCCESS:
			return {
				...state,
				blogs: action.myBlogs
			}
		case actionTypes.DELETE_BLOGS_SUCCESS:
			const updatedBlogs = removeBlog(state.blogs.slice(), action.deletedId);
			return{
				...state,
				blogs: updatedBlogs
			}
		case actionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: [...action.categories]
			}
		case actionTypes.LOAD_ABOUT_SUCCESS:
			return {
				...state,
				about: action.about
			}
		default:
			return state;
	}
}

function removeBlog(arr, blogId){
	if(!arr) return [];
	return arr.filter( blog => blog._id !== blogId);
}

export default reducer;
