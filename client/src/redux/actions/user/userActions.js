import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from './types';
/*
    El Action creator es lo que le pasa al reducer el tipo por el cual actuar, tambien aca es donde se deben hacer
    las llamadas a los servicios para obtener la informacion. Por buena practica se devuelve un type y un payload.
*/
export const createUser = user => {
    console.log("CREATE_USER => ", user);
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const signInUser = (mail, password) => {
    console.log("LOGIN_USER => mail = ", mail, " - password = ", password);
    let user;
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export const logoutUser = (user) => {
    console.log("LOGOUT_USER => ", user);
    return {
        type: LOGOUT_USER,
        payload: "User logged out"
    }
}

export const deleteUser = (user) => {
    console.log("DELETE_USER => ", user);
    return {
        type: DELETE_USER,
        payload: "User has been deleted"
    }
}