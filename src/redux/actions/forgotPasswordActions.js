import axios from 'axios';
import Swal from 'sweetalert2';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_REMOVE_ERROR = 'FORGOT_PASSWORD_REMOVE_ERROR';
export const FORGOT_PASSWORD_REMOVE_MSG = 'FORGOT_PASSWORD_REMOVE_MSG';
export const FORGOT_PASSWORD_SEND_EMAIL = 'FORGOT_PASSWORD_SEND_EMAIL';
export const FORGOT_PASSWORD_NEW_PASSWORD = 'FORGOT_PASSWORD_NEW_PASSWORD';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_REMOVE_ERROR = 'RESET_PASSWORD_REMOVE_ERROR';
export const RESET_PASSWORD_REMOVE_MSG = 'RESET_PASSWORD_REMOVE_MSG';
export const RESET_PASSWORD_UPDATE_PASSWORD = 'RESET_PASSWORD_UPDATE_PASSWORD';

const url = 'https://pg-delsur.herokuapp.com';
// const url = 'http://localhost:3001';


export const removeMsg = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FORGOT_PASSWORD_REMOVE_MSG });
    }
}
export const removeError = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FORGOT_PASSWORD_REMOVE_ERROR });
    }
}


export const sendEmail = (email) => {
    return async (dispatch, getState) => {
        let resp;
        await dispatch({ type: FORGOT_PASSWORD_REMOVE_ERROR });
        await dispatch({ type: FORGOT_PASSWORD_REMOVE_MSG });

        const formData = new FormData();
        formData.append('email', email);

        try {
            resp = await axios.post(url.concat(`/forgot-password`), formData);
            dispatch({
                type: FORGOT_PASSWORD_SEND_EMAIL
            });
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: resp.data
            });
          
        } catch (error) {
            console.log({ error: error.error });
            dispatch({
                type: FORGOT_PASSWORD_ERROR,
                payload: error?.response?.data?.error,
            });           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.error,
            });
        }
    }
}

export const resetPassword = (userId, password) => {
    return async (dispatch, getState) => {
        
        dispatch({
            type: RESET_PASSWORD_REMOVE_ERROR
        });
        dispatch({
            type: RESET_PASSWORD_REMOVE_MSG
        });
        const formData = new FormData();
        formData.append('id', userId);
        formData.append('password', password);

        try {
            dispatch({type: RESET_PASSWORD_UPDATE_PASSWORD});
            await axios.put(url.concat(`/user`), formData);
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: 'La password fue actualizada con suceso.'
            });           


        } catch (error) {
            console.log(error?.response?.data?.error);
            dispatch({
                type: RESET_PASSWORD_ERROR,
                payload: error?.response?.data?.error,
            });
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.error,
            });
        }
    }
}

