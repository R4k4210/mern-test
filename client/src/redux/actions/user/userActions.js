import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from './types';
/*
    El Action creator es lo que le pasa al reducer el tipo por el cual actuar, tambien aca es donde se deben hacer
    las llamadas a los servicios para obtener la informacion. Por buena practica se devuelve un type y un payload.
*/
export const createUser = user => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const signInUser = (mail, password) => {
    
}