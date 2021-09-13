import { OFFERS_LOADING, OFFERS_ERROR, OFFERS_GET_ALL, OFFERS_REMOVE_ERROR, OFFERS_PUT, OFFERS_UPDATE, OFFERS_DELETE } from '../actions/offersManagerActions';

const initialState = {
    fetching: false,
    error: null,
    offers: []
}


const offersManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OFFERS_LOADING: {
            return {
                ...state,
                fetching: true,
                // error: null,
            }
        }

        case OFFERS_GET_ALL: {
            return {
                ...state,
                fetching: false,
                offers: [...action.payload],
                error: null,
            }
        }

        case OFFERS_PUT: {
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

        case OFFERS_DELETE: {
            return {
                ...state,
                offers: state.offers.filter(offer => offer.id !== action.payload),
                fetching: false,
            }
        }


        case OFFERS_UPDATE: {
            return {
                ...state,
                // offers: state.offers.ma
                error: null,
                fetching: false,
            }
        }

        case OFFERS_ERROR: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }

        case OFFERS_REMOVE_ERROR: {
            return {
                ...state,
                error: null,
            }
        }


        default:
            return state;
    }
}

export default offersManagerReducer;