import { USERS_MANAGER_LOADING,
    // USERS_MANAGER_SUCCESS,
    USERS_MANAGER_ERROR,
    USERS_MANAGER_REMOVE_ERROR,
    USERS_MANAGER_GET_ALL,
    USERS_MANAGER_PUT,
    USERS_MANAGER_DELETE,
    USERS_MANAGER_UPDATE } from '../actions/usersManagerActions';

const initialState = {
    fetching: false,
    error: null,
    users: []
}


const usersManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_MANAGER_LOADING: {
            return {
                ...state,
                fetching: true,
                // error: null,
            }
        }

        case USERS_MANAGER_GET_ALL: {
            return {
                ...state,
                fetching: false,
                users: [...action.payload],
                error: null,
            }
        }

        case USERS_MANAGER_PUT: {
            return {
                ...state,
                fetching: false,
                offers: [
                    ...state.offers,
                    action.payload,
                ],
                // offers: [...state.offers.concat(action.payload)],
                error: null,
            }
        }

        case USERS_MANAGER_DELETE: {
            return {
                ...state,
                offers: state.users.filter(user => user.id !== action.payload),
                fetching: false,
            }
        }


        case USERS_MANAGER_UPDATE: {
            return {
                ...state,
                // offers: state.offers.ma
                error: null,
                fetching: false,
            }
        }

        case USERS_MANAGER_ERROR: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }

        case USERS_MANAGER_REMOVE_ERROR: {
            return {
                ...state,
                error: null,
            }
        }

        default:
            return state;
    }
}

export default usersManagerReducer;
