import axios from 'axios'
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

    

export const getOrderHistory=()=>{
    let userData = localStorage.getItem('auth');
    userData = JSON.parse(userData);
    // console.log('userData', userData);
    return async function(dispatch){
        await axios.get(`https://pg-delsur.herokuapp.com/orders/userOrders/${userData.uid}`)

        .then(results =>{            
            dispatch({
                type: GET_ORDER_HISTORY,
                payload: results.data
            })
        })
    }
}

export const getOrderDetails = (id) => {
    return async function(dispatch){
        await axios.get(`https://pg-delsur.herokuapp.com/orders/getOrderById/${id}`)

        .then(results =>{            
            dispatch({
                type: GET_ORDER_DETAILS,
                payload: results.data
            })
        })
    }
}

export const updateOrder = (id) => {
    return async function(dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders/updateOrder/${id}`)

        .then(results =>{
            dispatch({
                type: UPDATE_ORDER,
                payload: results.data
            })
        })
    }
}

export const getAllOrders = () => {
    return async function(dispatch) {
        await axios.get(`https://pg-delsur.herokuapp.com/orders`)
        .then(results =>{
            dispatch({
                type: GET_ALL_ORDERS,
                payload: results.data
            })
        })
    }
}



