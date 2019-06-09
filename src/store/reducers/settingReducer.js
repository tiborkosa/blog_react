import * as actionTypes from '../actions/actionTypes';

const initialState = {
	first_name:'',
    last_name:'',
    age: '',
    email:'',
    profileImage:'',
    about:'',
    aboutImage: '',
    aboutId:''
}

const reducer = (state=initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SETTING_LOAD_SUCCESS:
			return {
				first_name : action.settings.user.first_name,
                last_name:action.settings.user.last_name,
                age: action.settings.user.age,
                email:action.settings.user.email,
                profileImage:action.settings.user.image,
                about:action.settings.about,
                aboutImage: action.settings.image,
                aboutId:action.settings._id
			}
        case actionTypes.UPDATE_ABOUT_SUCCESS:
        case actionTypes.UPDATE_USER_SUCCESS:
		default:
			return state;
	}
}

export default reducer;
