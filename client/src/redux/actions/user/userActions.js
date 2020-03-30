import { CREATE_USER, LOGIN_USER, LOGOUT_USER, DELETE_USER } from './types';

export const createUser = user => {
    return {
        type: CREATE_USER,
        payload: user
    }
}