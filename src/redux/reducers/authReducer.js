import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_LOGOUT } from '../actions/authActions';

const initialState = {
    loggedIn: false,
    fetching: false,
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                fetching: true,
            }
        }

        case AUTH_LOGIN_SUCCESS: {
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                ...action.payload
            };
        }

        case AUTH_LOGIN_ERROR: {
            return {
                ...state,
                fetching: false,
                loggedIn: false,
                error: action.payload
            }
        }

        case AUTH_LOGOUT: {
            return { ...initialState }
        }       

        default:
            return state;

    }
}

export default authReducer;