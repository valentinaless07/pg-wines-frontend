import axios from 'axios';
import Swal from 'sweetalert2';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import { saveStorage } from '../../helpers/helpers';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup } from 'firebase/auth';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REMOVE_ERROR = 'AUTH_REMOVE_ERROR';

export const startGoogleLogin = () => {
    return (dispatch, getState) => {
        dispatch({
            type: AUTH_LOGIN
        });
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                // Verify if user exists in our db.
                // If it's true, take aditional data and put it in local storage and redux state.
                // If it's false, create a new user in our db.

                dispatch(
                    {
                        type: AUTH_LOGIN_SUCCESS,
                        payload: {
                            uid: user.uid,
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
    let auth = localStorage.getItem('auth');
    auth = JSON.parse(auth);
    if (auth && auth.loggedIn) {
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

export const startRegisterWithEmailAndPassword = (name, email, password) => {
    return async (dispatch, getState) => {
        const auth = getAuth();
        await dispatch({
            type: AUTH_REMOVE_ERROR
        });
        await dispatch({
            type: AUTH_LOGIN
        });
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                let register = await axios.post(`https://pg-delsur.herokuapp.com/user/register`, { name: name, email: user.email, password: user.reloadUserInfo.passwordHash });
                
                if(localStorage.getItem("cart")){
                let localStorageState =  JSON.parse(localStorage.getItem("cart"))
                               
                localStorageState.forEach(el =>
                        
                        axios.post("https://pg-delsur.herokuapp.com/carts/addCartItem/"+register.data.id, {id: el.id, quantity: el.quantity})
                        
                        
                    )
                
                localStorage.removeItem("cart")
                }


                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    
                    dispatch(
                        {
                            type: AUTH_LOGIN_SUCCESS,
                            payload: {                                
                                uid: register.data.id,
                                displayName: register.data.name,
                                photoURL: register.data.photoURL,
                                email: register.data.email,
                                password: register.data.password,
                                active: register.data.active,
                                admin: register.data.admin,
                                birthDate: register.data.birthDate,
                            }
                        }
                    )
                    saveStorage(getState().auth);

                })
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                dispatch({
                    type: AUTH_LOGIN_ERROR,
                    payload: errorMessage,
                });
                switch (true) {
                    case (errorCode === 'auth/email-already-in-use'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El email ya existe, escribir otro email.',
                        });
                    case (errorCode === 'auth/invalid-email'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El email no es valido.',
                        });
                    case (errorCode === 'auth/network-request-failed'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Conección a Iternet inexistente.',
                        });


                    default:
                        // console.log(error);
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                        });
                }
            })
    }
}
export const startLoginWithEmailAndPassword = (email, password, name) => {
    return (dispatch, getState) => {
        dispatch({
            type: AUTH_LOGIN
        });

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                let login = await axios.post(`https://pg-delsur.herokuapp.com/user/login`, { email: user.email, password: user.reloadUserInfo.passwordHash });
                if(login && !login?.data.active) {
                    console.log('it is disabled')
                    dispatch({
                        type: AUTH_LOGIN_ERROR,
                        payload: 'El usuario no existe',
                    });
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No existe ningún usuario con este email.',
                    });
                }
                console.log('login:', login)
                dispatch(
                    {
                        type: AUTH_LOGIN_SUCCESS,
                        payload: {          
                            uid: login.data.id,
                            displayName: login.data.name,
                            photoURL: login.data.photoURL,
                            email: login.data.email,
                            password: login.data.password,
                            active: login.data.active,
                            admin: login.data.admin,
                            birthDate: login.data.birthDate,
                        }
                    }
                )
                saveStorage(getState().auth);
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                dispatch({
                    type: AUTH_LOGIN_ERROR,
                    payload: errorMessage,
                });
                switch (true) {
                    case (errorCode === 'auth/invalid-email'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El email no es valido.',
                        });
                    case (errorCode === 'auth/user-not-found'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No existe ningún usuario con este email.',
                        });
                    case (errorCode === 'auth/wrong-password'):
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Password errada.',
                        });
                    default:
                        // console.log(error);
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                        });
                }
            });
    }
}