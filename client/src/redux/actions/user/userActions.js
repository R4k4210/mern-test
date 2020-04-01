import axios from 'axios';
import { api } from '../../../config/keys';
import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from './types';

/*
    Se realizan llamadas asincronicas a la API con axios, para luego
    llamar de manera sincronica al Action que llamara al Reducer para que
    actualice el State
*/
export const createUser = user => {
    console.log("AXIOS CREATE USER => ", user);
    return dispatch => {
        return axios.post(`${api.user}/register`, user)
            .then(authUser => {
                console.log(authUser);
                dispatch(createUserSuccess(authUser));
            })    
            .catch(err => console.log(err));        
    }    
}

export const signInUser = (email, password) => {
    console.log(email, password);
    return dispatch => {
        return axios.post(`${api.user}/login`, {email, password})
            .then(authUser => {
                console.log(authUser);
                dispatch(signInUserSuccess(authUser));
            })
            .catch(err => console.log(err));
    }
}


/*
    REDUCERS
    El Action creator es lo que le pasa al reducer el tipo por el cual actuar, tambien aca es donde se deben hacer
    las llamadas a los servicios para obtener la informacion. Por buena practica se devuelve un type y un payload.
*/
export const createUserSuccess = user => {
    console.log("CREATE_USER => ", user);
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const signInUserSuccess = user => {
    console.log("LOGIN_USER => ", user);
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