import { combineReducers } from 'redux/index';
import auth from './auth.reducer';

const rootReducer = combineReducers({
	auth
});

export default rootReducer;
