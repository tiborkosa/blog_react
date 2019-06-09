import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showSignIn: false,
	showEmailValidation: false,
	showUpdatePassword: false,
	showNavigation : false,
	email: '',
	tokenId: localStorage.getItem('tblogToken'),
	isForgotPassword: false,
	user: localStorage.getItem('tblogUser')
}

const authenticationReducer = (state=initialState, action) => {
	switch ( action.type ) {
		case actionTypes.SUBMIT_SIGN_IN_SUCCESS:
			return {
				...state,
				tokenId: action.data.tokenID,
				user: action.data.user,
				showSignIn: false
			}
		case actionTypes.SUBMIT_EMAIL_SUCCESS:
			return {
				...state,
				email: action.data.email,
				showEmailValidation: false,
				showUpdatePassword: true
			}
		case actionTypes.LOG_OUT:
			return {
				...state,
				showNavigation: false,
				tokenId: null,
				user: null
			}
		case actionTypes.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				showSignIn: true,
				showUpdatePassword: false
			}
		case actionTypes.SHOW_NAVIGATION_CLICK:
			return {
				...state,
				showNavigation: !state.showNavigation,
				showSignIn: false,
				showEmailValidation: false,
				showUpdatePassword: false,
			}
		case actionTypes.SHOW_SIGN_IN_CLICK:
			return {
				...state,
				showNavigation: false,
				showSignIn: true,
				showEmailValidation: false,
				showUpdatePassword: false,
			}
		case actionTypes.SHOW_SIGN_UP_CLICK:
			return {
				...state,
				showSignIn: false,
				showEmailValidation: true,
				isForgotPassword: action.isForgot,
				showUpdatePassword: false,
			}
		case actionTypes.SHOW_FORGOT_PASSWORD_CLICK:
			return {
				...state,
				showNavigation: false,
				showSignIn: false,
				showEmailValidation: true,
				showUpdatePassword: false,
			}
		case actionTypes.CLOSE_MODAL_CLICK:
			let tokID = state.tokenId;
			let usr = state.user;
			if(action.removed){
				tokID = '';
				usr = '';
			}
			return {
				...state,
				tokenId: tokID,
				user: usr,
				showSignIn: false,
				showEmailValidation: false,
				showUpdatePassword: false,
				emailCode: ''
			}
		default:
			return state;
	}
}

export default authenticationReducer;
