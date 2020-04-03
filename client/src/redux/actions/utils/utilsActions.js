import { FORM_LOADING, HAS_ERRORS } from './types';

export const formLoading = isLoading => {
    return {
        type: FORM_LOADING,
        payload: isLoading
    }
}

export const hasErrors = hasError => {
    return {
        type: HAS_ERRORS,
        payload: hasError
    }
}