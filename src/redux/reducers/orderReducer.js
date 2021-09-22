import { GET_ORDER_HISTORY, GET_ORDER_DETAILS, UPDATE_ORDER, GET_ALL_ORDERS, UNINITIATED_FILTER,
    PROCCESING_FILTER, APPROVED_FILTER, CANCELLED_FILTER, NO_FILTER } from "../actions/orderActions";

let initialState = {
    orders: [],
    orders_details: [],
    orders_update: [],
    all_orders: [],
    filtered_orders: [],
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_HISTORY: {
            return {
                ...state,
                orders: action.payload
            }
        }
        case GET_ORDER_DETAILS: {
            return {
                ...state,
                orders_details: action.payload
            }
        }
        case UPDATE_ORDER: {
            return {
                ...state,
                orders_update: action.payload

            }
        }
        case GET_ALL_ORDERS: {
            return {
                ...state,
                all_orders: action.payload

            }
        }
        case UNINITIATED_FILTER: {
            return {
                ...state,
                filtered_orders: action.payload

            }
        }
        case PROCCESING_FILTER: {
            return {
                ...state,
                filtered_orders: action.payload

            }
        }
        case APPROVED_FILTER: {
            return {
                ...state,
                filtered_orders: action.payload

            }
        }
        case CANCELLED_FILTER: {
            return {
                ...state,
                filtered_orders: action.payload

            }
        }
        case NO_FILTER: {
            return {
                ...state,
                filtered_orders: action.payload

            }
        }

        default:
            return state
    }
}

export default orderReducer;