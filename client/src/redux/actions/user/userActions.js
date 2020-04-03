import axios from 'axios';
import { api } from '../../../config/keys';
import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER, USER_ERRORS, HIDE_USER_ERRORS } from './types';
import { FORM_LOADING } from '../utils/types';

/*
    Se realizan llamadas asincronicas a la API con axios, para luego
    llamar de manera sincronica al Action que llamara al Reducer para que
    actualice el State
*/
export const createUser = user => dispatch => {
    dispatch({
        type: FORM_LOADING,
        payload: true
    });
    return axios.post(`${api.user}/register`, user).then(response => 
        //Llamamos al Reducer
        dispatch({
            type: CREATE_USER,
            payload: response.data 
        }),
        error => dispatch({
            type: USER_ERRORS,
            payload: error.response
        })
    );
}

export const signInUser = (email, password) => dispatch => {
    return axios.post(`${api.user}/login`, {email, password}).then(response =>
        //Llamamos al Reducer
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        }),
        error => dispatch({
            type: USER_ERRORS,
            payload: error.response
        })
    );
}

/*
Esta es otra forma mas separada de tener una funciona que maneja la llamada por axios
para luego llamar al Action.
El Action creator es lo que le pasa al reducer el tipo por el cual actuar, tambien aca es donde se deben hacer
las llamadas a los servicios para obtener la informacion. Por buena practica se devuelve un type y un payload.

export const createUser = user => {
    console.log("AXIOS CREATE USER => ", user);
    return dispatch => {
        return axios.post(`${api.user}/register`, user)
            .then(response => {
                console.log(response);
                dispatch(createUserSuccess(response));
            })    
            .catch(err => console.log("createUser => error: ", err));        
    }    
}

export const createUserSuccess = user => {
    console.log("CREATE_USER => ", user);
    return {
        type: CREATE_USER,
        payload: user
    }
}


export const signInUser = (email, password) => {
    console.log(email, password);
    return dispatch => {
        return axios.post(`${api.user}/login`, {email, password})
            .then(response => {
                console.log("signInUser => response: ", response);
                dispatch(signInUserSuccess(response));
            })
            .catch(err => {
                console.log("signInUser => error: ", err);
                console.log("signInUser => error response: ", err.response);
                return err;
            });
    }
}

export const signInUserSuccess = user => {
    console.log("LOGIN_USER => ", user);
    return {
        type: LOGIN_USER,
        payload: user
    }
}

*/

export const hideError = () => {
    return {
        type: HIDE_USER_ERRORS
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