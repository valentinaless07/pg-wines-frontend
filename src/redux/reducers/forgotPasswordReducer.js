import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_REMOVE_ERROR, FORGOT_PASSWORD_SEND_EMAIL, FORGOT_PASSWORD_REMOVE_MSG,RESET_PASSWORD_UPDATE_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from '../actions/forgotPasswordActions';

const initialState = {   
    fetching: false,
    error: null,  
    msg: null, 
    email: null,   
}

const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {  

        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                fetching: false,     
                msg: null,          
                error: action.payload
            }
        }

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                fetching: false,                
                error: null,
                msg: action.payload,               
            };
        }

        case RESET_PASSWORD_UPDATE_PASSWORD: {
            return {
                ...state,
                fetching: true,
            }
        }

        case FORGOT_PASSWORD_REMOVE_ERROR: {
            return {
                ...state,
                fetching: false,
                error: null,
            }
        }     
        case FORGOT_PASSWORD_REMOVE_MSG: {
            return {
                ...state,
                fetching: false,
                msg: null,
            }
        }   

        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                fetching: false,     
                msg: null,          
                error: action.payload
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                fetching: false,                
                error: null,
                msg: action.payload,               
            };
        }

        case FORGOT_PASSWORD_SEND_EMAIL: {
            return {
                ...state,
                fetching: true,
            }
        }

        default:
            return state;

    }
}

export default forgotPasswordReducer;