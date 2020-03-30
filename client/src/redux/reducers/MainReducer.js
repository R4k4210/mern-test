import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

const Reducer = combineReducers({
    user: UserReducer
});

export default Reducer;