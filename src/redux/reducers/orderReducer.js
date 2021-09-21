import { GET_ORDER_HISTORY, GET_ORDER_DETAILS, UPDATE_ORDER, GET_ALL_ORDERS } from "../actions/orderActions";

let initialState = {
    orders: [],
    orders_details: [],
    orders_update: [],
    all_orders: [],
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
        case UPDATE_ORDER:{
            return {
                ...state,
                orders_update:action.payload

            }
        }
        case GET_ALL_ORDERS:{
            return {
                ...state,
               all_orders:action.payload

            }
        }
            
        default:
            return state
    }
}

export default orderReducer;