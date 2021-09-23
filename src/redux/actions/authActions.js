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
    return async (dispatch, getState) => {
        await dispatch({
            type: AUTH_REMOVE_ERROR
        });
        dispatch({
            type: AUTH_LOGIN
        });
        const auth = getAuth();
        let googleLogin;
   
        let dbLogin;
        try {
            googleLogin = await signInWithPopup(auth, googleAuthProvider);
            // console.log(googleLogin.user.email, googleLogin.user.displayName)
            dbLogin = await axios.post(`https://pg-delsur.herokuapp.com/user/login`, { email: googleLogin.user.email, name:googleLogin.user.displayName, password: googleLogin.user.uid });
            if(dbLogin && !dbLogin?.data.active) {
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
            if(dbLogin.status === 200){
                if(localStorage.getItem("cart")){
                    
                    let localStorageState =  JSON.parse(localStorage.getItem("cart"))
                    
                    let localState = []
                    localStorageState.forEach(el =>{
                        localState.push({
                            id: el.id,
                            quantity: el.quantity
                        })
                    })
                                   
                    
                            
                    axios.post("https://pg-delsur.herokuapp.com/carts/addVariusItemsCart/"+dbLogin.data.id, localState)
                    
                            
                        
                    
                    localStorage.removeItem("cart")
                    
                }
                dispatch(
                    {
                        type: AUTH_LOGIN_SUCCESS,
                        payload: {
                            uid: dbLogin.data.id,
                            displayName: dbLogin.data.name,
                            photoURL: dbLogin.data.photoURL,
                            email: dbLogin.data.email,
                            password: dbLogin.data.password,
                            active: dbLogin.data.active,
                            admin: dbLogin.data.admin,
                            birthDate: dbLogin.data.birthDate,
                        }
                    }
                )
                saveStorage(getState().auth);
            }
            
        } catch (error) {
            if(error.response.status === 404){
                if(error.response.data.error === 'User not found'){
                    let register = await axios.post(`https://pg-delsur.herokuapp.com/user/register`, {  name:googleLogin.user.displayName, email: googleLogin.user.email, password: googleLogin.user.uid });
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
                }
                if(error.response.data.error === 'Password is not valid'){
                    console.log('Password is not valid');
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La password no es válida.',
                    });
                }
            }
        }
        

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
                
                let localState = []
                localStorageState.forEach(el =>{
                    localState.push({
                        id: el.id,
                        quantity: el.quantity
                    })
                })
                               
                
                        
                axios.post("https://pg-delsur.herokuapp.com/carts/addVariusItemsCart/"+register.data.id, localState)
                
                        
                    
                
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

                
                if(localStorage.getItem("cart")){
                    
                    let localStorageState =  JSON.parse(localStorage.getItem("cart"))
                    
                    let localState = []
                    localStorageState.forEach(el =>{
                        localState.push({
                            id: el.id,
                            quantity: el.quantity
                        })
                    })
                                   
                    
                            
                    axios.post("https://pg-delsur.herokuapp.com/carts/addVariusItemsCart/"+login.data.id, localState)
                    
                            
                        
                    
                    localStorage.removeItem("cart")
                    
                }
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