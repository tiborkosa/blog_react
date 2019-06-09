import * as actionTypes from '../actions/actionTypes';
// separate the states
const initialState = {
	id:'',
    title:'',
    description:'',
    tags: [],
    categories: [],
	content: [],
	comments: [],
	commentPage: 0,
	isMoreComments: false,
	isLiked: false
}
/**
 * save or publish will redirect to myBlogs
 *  */

const reducer = (state=initialState, action) => {
	switch ( action.type ) {
		case actionTypes.GET_BLOG_SUCCESS:
			return {
				id: action.blog._id,
				title: action.blog.title,
				description: action.blog.desc,
				tags: [...action.blog.tags],
				categories: [...action.blog.categories],
				content: [...action.blog.body],
				comments: [],
				commentPage: 0,
				isMoreComments: false,
				isLiked: action.blog.isLiked
			}
		case actionTypes.DELETE_BLOGS_SUCCESS:
			return {
				title:'',
				description:'',
				tags: [],
				categories: [],
				content: [],
				comments: [],
				commentPage: 0,
				isMoreComments: true,
				isLiked: false
			};
		case actionTypes.LOAD_COMMENTS_SUCCESS:
			return {
				...state,
				comments: [...state.comments, ...action.comments],
				commentPage: action.page + 1,
				isMoreComments: action.isLast
			};
		case actionTypes.ADD_COMMENT_SUCCESS:
			return {
				...state,
				comments: [action.comment, ...state.comments]
			}
		case actionTypes.UPDATE_COMMENT_SUCCESS:
			return {
				...state,
				comments:updateComment(state.comments.slice(), action.comment)
			};
		case actionTypes.REMOVE_COMMENT_SUCCESS:
			return {
				...state,
				comments: removeComment(state.comments.slice(),action.deleted.id)
			};
		case actionTypes.UPDATE_LIKE_SUCCESS:
			return {
				...state,
				isLiked: true
			};
		case actionTypes.REMOVE_LIKE_SUCCESS:
			return {
				...state,
				isLiked: false
			};
		default:
			return state;
	}
}
const removeComment = (arr, id) => {
	if(!arr) return [];
	return arr.filter(el => el._id !== id);
};
const updateComment = (arr, data) => arr.map( el => {
	if(el._id === data._id){
		el.comment = data.comment
	}
	return el;
});

export default reducer;
