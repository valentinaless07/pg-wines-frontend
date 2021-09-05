import {GET_PRODUCTS, GET_CATEGORY, FILTER_BY} from '../actions/userActions'

let initialState={
    products:[],
    category:[],
    productsFiltered:[]
}

const productReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_PRODUCTS:{
            return{
                ...state,
                products: action.payload
            }
        }
        case GET_CATEGORY:{
            return{
                ...state,
                category: action.payload
            }
        }

        case FILTER_BY:{
            return{
                ...state,
                productsFiltered: action.payload
            }
        }
        default:
            return state
    }
}

export default productReducer;