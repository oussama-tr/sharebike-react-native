import { createStore } from 'redux/index';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
	return createStore(rootReducer);
}
