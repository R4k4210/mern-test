import { FORM_LOADING } from '../actions/utils/types';

const initialState = {};
function utilsReducer(state = initialState, action) {
    switch (action.type) {
        case FORM_LOADING:
            return {
                loading: action.payload
            }
        default:
            return state;
    }
}

export default utilsReducer;