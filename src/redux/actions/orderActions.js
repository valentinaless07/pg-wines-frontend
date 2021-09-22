import axios from 'axios'
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const UNINITIATED_FILTER = 'UNINITIATED_FILTER';
export const PROCCESING_FILTER = 'PROCCESING_FILTER';
export const APPROVED_FILTER = 'APPROVED_FILTER';
export const CANCELLED_FILTER = 'CANCELLED_FILTER';
export const NO_FILTER = 'NO_FILTER';



export const getOrderHistory = () => {
    let userData = localStorage.getItem('auth');
    userData = JSON.parse(userData);
    // console.log('userData', userData);
    return async function (dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders/userOrders/${userData.uid}`)

            .then(results => {
                dispatch({
                    type: GET_ORDER_HISTORY,
                    payload: results.data
                })
            })
    }
}

export const getOrderDetails = (id) => {
    return async function (dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders/getOrderById/${id}`)

            .then(results => {
                dispatch({
                    type: GET_ORDER_DETAILS,
                    payload: results.data
                })
            })
    }
}

export const updateOrder = (id) => {
    return async function (dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders/updateOrder/${id}`)

            .then(results => {
                dispatch({
                    type: UPDATE_ORDER,
                    payload: results.data
                })
            })
    }
}

export const getAllOrders = () => {
    return async function (dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders`)
            .then(results => {
                dispatch({
                    type: GET_ALL_ORDERS,
                    payload: results.data
                })
            })
    }
}

export const filterOrders = (by) => (dispatch, getState) => {
    const orders = getState().orders.all_orders.slice()
    let filteredOrders = [];

    switch (by) {
        case 'uninitiated':
            filteredOrders = orders.filter(o => o.status.toLowerCase() === 'uninitiated');
            dispatch({
                type: UNINITIATED_FILTER,
                payload: filteredOrders
            })
            break;
        case 'processing':
            filteredOrders = orders.filter(o => o.status.toLowerCase() === 'processing');
            dispatch({
                type: PROCCESING_FILTER,
                payload: filteredOrders
            })
            break;
        case 'approved':
            filteredOrders = orders.filter(o => o.status.toLowerCase() === 'approved');
            dispatch({
                type: APPROVED_FILTER,
                payload: filteredOrders
            })
            break;
        case 'cancelled':
            filteredOrders = orders.filter(o => o.status.toLowerCase() === 'cancelled');
            dispatch({
                type: CANCELLED_FILTER,
                payload: filteredOrders
            })
            break;
        case 'All':
            dispatch({
                type: NO_FILTER,
                payload: orders
            })
            break;

        default:
            return orders;
    }
}



