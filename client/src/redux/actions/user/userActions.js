import axios from 'axios';
import { api } from '../../../config/keys';
import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER, USER_ERRORS, HIDE_USER_ERRORS } from './types';
import { FORM_LOADING, HAS_ERRORS } from '../utils/types';

/*
    Se realizan llamadas asincronicas a la API con axios, para luego
    llamar de manera sincronica al Action que llamara al Reducer para que
    actualice el State
*/

const emptyError = {};

export const createUser = user => dispatch => {
    dispatch({
        type: FORM_LOADING,
        payload: true
    });
    return axios.post(`${api.user}/register`, user)
        .then(response => {
            dispatch({
                type: CREATE_USER,
                payload: response.data 
            })
            dispatch({
                type: HAS_ERRORS,
                payload: false 
            })
        })
        .catch(error => {
            dispatch({
                type: USER_ERRORS,
                payload: error.response || emptyError
            })
            dispatch({
                type: HAS_ERRORS,
                payload: true 
            })
        })
}


export const signInUser = (email, password) => dispatch => {
    dispatch({
        type: FORM_LOADING,
        payload: true
    });
    
    return axios.post(`${api.user}/login`, {email, password})
        .then(response => {
            dispatch({
                type: LOGIN_USER,
                payload: response.data
            })
            dispatch({
                type: HAS_ERRORS,
                payload: false 
            })
        })
        .catch( error => {
            dispatch({
                type: USER_ERRORS,
                payload: error.response || emptyError
            })
            dispatch({
                type: HAS_ERRORS,
                payload: true 
            })
        });     
}

export const signInGoogleUser = (token) => dispatch => {
    dispatch({
        type: FORM_LOADING,
        payload: true
    });

    let config = {
        headers: {
            'Content-Type': 'application/json',
            "x-auth-token": token,
        }
    }

    return axios.post(`${api.google}/glogin`, null, config)
        .then(response => {
            dispatch({
                type: LOGIN_USER,
                payload: response.data
            })
            dispatch({
                type: HAS_ERRORS,
                payload: false 
            })
        })
        .catch(error => {
            dispatch({
                type: USER_ERRORS,
                payload: error.response || emptyError
            })
            dispatch({
                type: HAS_ERRORS,
                payload: true 
            })
        });
}

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