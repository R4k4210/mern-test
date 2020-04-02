import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER, USER_ERRORS, HIDE_USER_ERRORS } from '../actions/user/types';

/*
    El reducer propiamente dicho lo unico que hace es recibir el estado anterior y el action, dependiendo del type que vengan en el 
    action, es lo que debe hacer. Siempre se debe devolver el store anterior en el default, este siempre debe estar presente.
    Cuando se filtra por un tipo, se puede devolver directamente el objeto ej: return action.payload o, se puede devolver como en ejemplo 
    de abajo, siempre pasando el estado anterior sin mutarlo.
*/
const initialState = {};
function userReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,                
                member: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                member: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                member: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                message: "User has been deleted"
            }
        case USER_ERRORS:
            return {
                ...state,
                errors: action.payload,
                snackOpen: true
            }
        case HIDE_USER_ERRORS:
            return {
                initialState,
                snackOpen: false
            }
        
        default:
            return state;
    }
}

export default userReducer;