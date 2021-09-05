// import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import { saveStorage } from '../../helpers/helpers';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const startLoginEmailPassword = () => {
    return (dispatch) => {      
        dispatch({
            type: AUTH_LOGIN,
            payload: {loggedIn:true}
        });
        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: {loggedIn:true}
        });      
    }
}

export const startGoogleLogin = () =>{
    return (dispatch, getState) =>{
        dispatch({
            type: AUTH_LOGIN
        });
        const auth = getAuth();        
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(
                    {
                        type:AUTH_LOGIN_SUCCESS,
                        payload: {
                            // uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                        }
                    }
                )            
                saveStorage(getState().auth);
        }).catch(err => {
            console.log(err);
            dispatch({
                type: AUTH_LOGIN_ERROR,
                payload: err.message
            })
        })
        
    }
}

export const restoreSessionAction = () => (dispatch, getState) => {
    let auth =  localStorage.getItem('auth');
    auth = JSON.parse(auth);
    if(auth && auth.loggedIn){
        dispatch({
           type: AUTH_LOGIN_SUCCESS,
           payload: auth,
        });
    }
}

export const logOutAction = () => (dispatch, getState) => {
    const auth = getAuth();
    auth.signOut();
    dispatch({
        type: AUTH_LOGOUT,
    })
    localStorage.removeItem('auth');
}
