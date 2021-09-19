import axios from 'axios'
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';

    

export const getOrderHistory=()=>{
    let userData = localStorage.getItem('auth');
    userData = JSON.parse(userData);
    console.log('userData', userData);
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


