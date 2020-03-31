import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from '../actions/user/types';

/*
    El reducer propiamente dicho lo unico que hace es recibir el estado anterior y el action, dependiendo del type que vengan en el 
    action, es lo que debe hacer. Siempre se debe devolver el store anterior en el default, este siempre debe estar presente.
    Cuando se filtra por un tipo, se puede devolver directamente el objeto ej: return action.payload o, se puede devolver como en ejemplo 
    de abajo, siempre pasando el estado anterior sin mutarlo.
*/
function Reducer(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,                
                user: action.payload
            }
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