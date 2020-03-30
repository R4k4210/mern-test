import { createStore } from 'redux';
import MainReducer from './reducers/MainReducer';

const Store = createStore(
    MainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
