import { GET_PRODUCTS, GET_CATEGORY, PRODUCT_BY_CATEGORY } from '../actions/userActions'

let initialState = {
    products: [],
    category: [],
    productsFiltered: [],
    product_search: [],
    product_detail: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }
        case GET_CATEGORY: {
            return {
                ...state,
                category: action.payload
            }
        }
        case PRODUCT_BY_CATEGORY:{
            
            return{
                ...state,
                products: action.payload
            }
        }
        case PRODUCTS_PAGE:
            return{
                ...state,
                products: action.payload
            }
        case "GET_PRODUCT_BY_ID":
            return {
                ...state,
                product_detail: action.payload,
            };
        case "PRODUCT_DETAIL_RESET":
            return {
                ...state,
                product_detail: action.payload,
            };

        case 'GET_PRODUCT_BY_NAME':
            return {
                ...state,
                product_search: action.payload
            }
        case 'PRODUCT_BY_NAME_RESET':
            return {
                ...state,
                product_search: action.payload
            }
        default:
            return state
    }
}

export default productReducer;