import axios from 'axios'
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';

    

export const getOrderHistory=()=>{
    return async function(dispatch){
        // await axios.get('https://pg-delsur.herokuapp.com/products/')
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/`)
        .then(results =>{            
            dispatch({
                type: GET_ORDER_HISTORY,
                payload: results.data
            })
        })
    }
}

export const getOrderDetails=()=>{
    return async function(dispatch){
        // await axios.get('https://pg-delsur.herokuapp.com/products/')
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/`)
        .then(results =>{            
            dispatch({
                type: GET_ORDER_DETAILS,
                payload: results.data
            })
        })
    }
}


