import {GET_PRODUCTS, GET_CATEGORY} from '../actions/userActions'

let initialState={
    products:[],
    category:[]
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
        default:
            return state
    }
}

export default productReducer;