import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	error: null
}

const reducer = (state=initialState, action) => {
	switch ( action.type ) {
		case actionTypes.FORM_SUBMIT_START:
		
			return {
				error: null,
				loading: true
			}
		case actionTypes.FORM_SUBMIT_FAIL:
		console.log(action.error)
			return {
				error: action.error.message,
				loading: false
            }
		case actionTypes.FORM_SUBMIT_SUCCESS:
            return {
				error: null,
				loading: false
			}
		case actionTypes.CLEAR_AUTH_ERROR:
            return {
				error: null,
				loading: false
            }
        default:
			return state;
    }
}
export default reducer;
