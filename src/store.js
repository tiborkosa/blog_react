import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './store/reducers/blogReducer';
import authenticationReducer from './store/reducers/authenticationReducer';
import commonReducer from './store/reducers/common';
import singleReducer from './store/reducers/singleBlogReducer';
import settingsReducer from './store/reducers/settingReducer';

const rootReducer = combineReducers({
	blogReducer: blogReducer,
	authReducer: authenticationReducer,
	common: commonReducer,
	singleBlogReducer: singleReducer,
	settingReducer: settingsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
