import { createStore, applyMiddleware, compose } from 'redux';
import MainReducer from './reducers/MainReducer';
import thunk from 'redux-thunk';

const Store = createStore(
    MainReducer,
    compose(applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({latency: 0}))
);

export default Store;
