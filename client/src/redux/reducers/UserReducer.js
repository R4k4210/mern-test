import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from '../actions/user/types';

function Reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGIN_USER:
            break;
        case LOGOUT_USER:
            break;
        case DELETE_USER:
            break;
        default:
            return state;
    }
}

export default Reducer;