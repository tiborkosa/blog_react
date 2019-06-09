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

export const getSettings = id => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.get('api/about/'+id)
			.then( res => {
                dispatch(submitFormSuccess());
                dispatch(getSettingsSuccess(res.data));
			 })
			.catch( err => {
				dispatch(submitFormFail(err)) 
			})
	}
}
const getSettingsSuccess = data => {
    return {
        type: actionTypes.SETTING_LOAD_SUCCESS,
        settings: data
    }
}
export const updateAbout = data => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.put('api/about/'+data.id, data)
			.then( res => {
                dispatch(submitFormSuccess());
                dispatch(updateAboutSuccess(res.data));
			 })
			.catch( err => {
				dispatch(submitFormFail(err)) 
			})
	}
}
const updateAboutSuccess = data => {
    return {
        type: actionTypes.UPDATE_ABOUT_SUCCESS,
        data: data
    }
}
export const updateUser = data => {
	return dispatch =>{
		dispatch(submitFormStart());
		axios
			.put('api/user/'+data.id, data)
			.then( res => {
                dispatch(submitFormSuccess());
                dispatch(updateUserSuccess(res.data));
			 })
			.catch( err => {
				dispatch(submitFormFail(err)) 
			})
	}
}
const updateUserSuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
        data: data
    }
}

