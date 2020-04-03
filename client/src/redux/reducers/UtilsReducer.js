import { FORM_LOADING, HAS_ERRORS } from '../actions/utils/types';

const initialState = {};
function utilsReducer(state = initialState, action) {
    switch (action.type) {
        case FORM_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case HAS_ERRORS:
            return {
                ...state,
                hasErrors: action.payload
            }
        default:
            return state;
    }
}

export default utilsReducer;