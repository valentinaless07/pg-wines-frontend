import axios from 'axios';
import Swal from 'sweetalert2';
export const USERS_MANAGER_LOADING = 'USERS_MANAGER_LOADING';
export const USERS_MANAGER_SUCCESS = 'USERS_MANAGER_SUCCESS';
export const USERS_MANAGER_ERROR = 'USERS_MANAGER_ERROR';
export const USERS_MANAGER_REMOVE_ERROR = 'USERS_MANAGER_REMOVE_ERROR';
export const USERS_MANAGER_GET_ALL = 'USERS_MANAGER_GET_ALL';
export const USERS_MANAGER_PUT = 'USERS_MANAGER_PUT';
export const USERS_MANAGER_DELETE = 'USERS_MANAGER_DELETE';
export const USERS_MANAGER_UPDATE = 'USERS_MANAGER_UPDATE';
// const url = `${process.env.REACT_APP_BACKEND_URL}`;
const url = 'https://pg-delsur.herokuapp.com';
// const url = 'http://localhost:3001';


export const getUsers = () => {
    return async (dispatch, getState) => {
        let resp;
        dispatch({
            type: USERS_MANAGER_LOADING
        });
        try {           
            resp = await axios.get(url.concat(`/user`));
            if (resp.status === 200) {
                dispatch({
                    type: USERS_MANAGER_GET_ALL,
                    payload: resp.data
                });
            } else {
                console.log('error interno')
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: USERS_MANAGER_ERROR,
                payload: error
            });
        }
    }
}

// payload => {id:xxx, fieldName: xxx}
export const updateUserById = (payload) => {
    return async (dispatch, getState) => {
        dispatch({
            type: USERS_MANAGER_LOADING
        });
      
        try {
            await axios.put(url.concat('/user'), payload);
            await getUsers()(dispatch, getState);           
            dispatch({
                type: USERS_MANAGER_UPDATE,
            });
       
           
        } catch (error) {
            console.log(error)
            dispatch({
                type: USERS_MANAGER_ERROR,
                payload: error
            });
        }
    }
}

