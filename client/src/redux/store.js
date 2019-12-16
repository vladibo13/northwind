import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import root from './reducers/index';
const initialState = {};
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, initialState, compose(applyMiddleware(thunk)));
export default store;
