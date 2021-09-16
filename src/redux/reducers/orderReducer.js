import { GET_ORDER_HISTORY, GET_ORDER_DETAILS } from "../actions/orderActions";

let initialState = {
    orders: [],
    orders_details: [],
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_HISTORY:{
            return {
                ...state,
                orders:action.payload
            }
        }
        case GET_ORDER_DETAILS:{
            return {
                ...state,
                orders_details:action.payload
            }
        }
            
        default:
            return state
    }
}

export default orderReducer;