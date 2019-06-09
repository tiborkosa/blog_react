import * as actionTypes from './actionTypes';
import axios from '../../axios-blog';

// common functions
export const submitFormStart = _ => {
	return {
		type: actionTypes.FORM_SUBMIT_START
	}
}
export const submitFormFail = err => {
	return {
		type: actionTypes.FORM_SUBMIT_FAIL,
		error: err
	}
}
export const clearAuthError = _ => {
	return {
		type: actionTypes.FORM_SUBMIT_SUCCESS
	}
}
//sign in
export const signIn = (data) => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.post('auth/signin', data)
			.then( res => {
				const expTime = new Date(new Date().getTime() + (60*60*1000));
				localStorage.setItem('tblogToken', res.data.tokenID);
				localStorage.setItem('tblogUser', res.data.user);
				localStorage.setItem('tblogExpTime', expTime);
				dispatch(clearAuthError());
				dispatch(signInSuccess(res.data));
			 })
			.catch( err => {
				console.log(err)
				dispatch(submitFormFail(err)) 
			})
	}
}
export const signInSuccess = data => {
	return {
		type: actionTypes.SUBMIT_SIGN_IN_SUCCESS,
		data: data
	}
}

//logout
export const logOut = e => {
	localStorage.removeItem('tblogToken');
	localStorage.removeItem('tblogUser');
	return{
		type: actionTypes.LOG_OUT
	}
}

// verify email
export const verifyEmail = (data) => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.post('auth/sendCode', data)
			.then( res => {
				dispatch(clearAuthError());
				dispatch(verifyEmailSuccess(res.data)) 
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}
export const verifyEmailSuccess = data => {
	return {
		type: actionTypes.SUBMIT_EMAIL_SUCCESS,
		data: data
	}
}

// change password
export const changePassword = (data) => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.post('auth/upSetPass',data)
			.then( res => {
				dispatch(clearAuthError());
				dispatch(changePasswordSuccess(res.data)) 
			})
			.catch( err => dispatch(submitFormFail(err)) )
	}
}

export const changePasswordSuccess = data => {
	return {
		type: actionTypes.CHANGE_PASSWORD_SUCCESS,
		data: data
	}
}

// click events
export const showNavigationClick = e => {
	e.stopPropagation();
	return {
		type: actionTypes.SHOW_NAVIGATION_CLICK
	}
}
export const showSignUpClick = isPass => {
	return {
		type: actionTypes.SHOW_SIGN_UP_CLICK,
		isForgot: isPass
	}
}
export const showSignInClick = e => {
	if(e) e.stopPropagation();
	return {
		type: actionTypes.SHOW_SIGN_IN_CLICK
	}
}
export const changePasswordClick = _ => {
	return {
		type: actionTypes.SHOW_FORGOT_PASSWORD_CLICK
	}
}
export const closeLogIn = _ => {
	const exp = localStorage.getItem('tblogExpTime');
	let removed = false;
	if(new Date(exp) < new Date()){
		localStorage.removeItem('tblogToken');
		localStorage.removeItem('tblogUser');
		localStorage.removeItem('tblogExpTime');
		removed = true;
	}
	return dispatch =>{
		dispatch(clearAuthError());
		dispatch(closeModal(removed));
	}
}
export const closeModal = r => {
	return {
		type: actionTypes.CLOSE_MODAL_CLICK,
		removed: r
	}
}

