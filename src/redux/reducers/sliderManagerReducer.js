import { SLIDER_LOADING, SLIDER_ERROR, SLIDER_GET_IMAGES, SLIDER_REMOVE_ERROR, SLIDER_PUT_IMAGE, SLIDER_UPDATE_IMAGE } from '../actions/sliderManagerActions';

const initialState = {
    fetching: false,
    error: null,
    sliderList: [
        {
            productId: 1,
            status: false,
            image: 'https://www.fullescabio.com/productos/1630947598/01_1630947598.webp?v=2215621'
        },
        {
            productId: 2,
            status: true,
            image: 'https://www.fullescabio.com/productos/1630612126/01_1630612126.webp?v=2215621'
        },
        {
            productId: 3,
            status: false,
            image: 'https://www.fullescabio.com/productos/1630088792/01_1630088792.webp?v=2215621'
        },
        {
            productId: 4,
            status: true,
            image: 'https://www.fullescabio.com/productos/1610722572/01_1610722572.webp?v=2215621'
        },
        {
            productId: 5,
            status: false,
            image: 'https://www.fullescabio.com/productos/1622053352/01_1622053352.webp?v=2215621'
        },
        {
            productId: 6,
            status: true,
            image: 'https://www.fullescabio.com/productos/1612221788/01_1612221788.webp?v=2215621'
        },
    ]
}


const sliderManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SLIDER_LOADING: {
            return {
                ...state,
                fetching: true,
                // error: null,
            }
        }

        case SLIDER_GET_IMAGES: {
            return {
                ...state,
                fetching: false,
                images: action.payload,
                error: null,
            }
        }

        case SLIDER_PUT_IMAGE: {
            return {
                ...state,
                fetching: false,
                images: action.payload,
                error: null,
            }
        }

        case SLIDER_UPDATE_IMAGE: {
            return {
                ...state,
                error: null,
            }
        }

        case SLIDER_ERROR: {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }

        case SLIDER_REMOVE_ERROR: {
            return {
                ...state,
                error: null,
            }
        }

        
        default:
            return state;
    }
}

export default sliderManagerReducer;