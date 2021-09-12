import { OFFERS_LOADING, OFFERS_ERROR, OFFERS_GET_ALL, OFFERS_REMOVE_ERROR, OFFERS_PUT, OFFERS_UPDATE, OFFERS_DELETE } from '../actions/offersManagerActions';

const initialState = {
    fetching: false,
    error: null,
    offers: [
        // {
        //     productId: 1,
        //     status: false,
        //     image: 'https://www.fullescabio.com/productos/1630947598/01_1630947598.webp?v=2215621'
        // },
        // {
        //     productId: 2,
        //     status: true,
        //     image: 'https://www.fullescabio.com/productos/1630612126/01_1630612126.webp?v=2215621'
        // },
        // {
        //     productId: 3,
        //     status: false,
        //     image: 'https://www.fullescabio.com/productos/1630088792/01_1630088792.webp?v=2215621'
        // },
        // {
        //     productId: 4,
        //     status: true,
        //     image: 'https://www.fullescabio.com/productos/1610722572/01_1610722572.webp?v=2215621'
        // },
        // {
        //     productId: 5,
        //     status: false,
        //     image: 'https://www.fullescabio.com/productos/1622053352/01_1622053352.webp?v=2215621'
        // },
        // {
        //     productId: 6,
        //     status: true,
        //     image: 'https://www.fullescabio.com/productos/1612221788/01_1612221788.webp?v=2215621'
        // },
    ]
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
            console.log('OBJECT', action.payload)
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