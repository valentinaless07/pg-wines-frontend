import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_LOGOUT, AUTH_REMOVE_ERROR } from '../actions/authActions';

const initialState = {
    loggedIn: false,
    fetching: false,
    error: null,
    uid: null,
    displayName: null,
    photoURL: null,
    email: null,
    active: false,
    admin: false,
    birthDate: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                fetching: true,
                // error: null,
            }
        }

        case AUTH_LOGIN_SUCCESS: {
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                error: null,
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

        case AUTH_REMOVE_ERROR: {
            return {
                ...state,
                error: null,
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