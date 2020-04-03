import { createStore, applyMiddleware, compose } from 'redux';
import MainReducer from './reducers/MainReducer';
import thunk from 'redux-thunk';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

const Store = createStore(
    MainReducer,
    compose(applyMiddleware(thunk), 
    devTools)
);

export default Store;
