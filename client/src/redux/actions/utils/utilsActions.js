import { FORM_LOADING } from './types';

export const formLoading = isLoading => {
    return {
        type: FORM_LOADING,
        payload: isLoading
    }
}