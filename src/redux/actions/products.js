import axios from "axios";

export const GET_PRODUCT_BY_NAME = 'GET_PRODUCT_BY_NAME';
export const PRODUCT_BY_NAME_RESET = 'PRODUCT_BY_NAME_RESET';

export const getProductByName = (name) => {
    return async function(dispatch){
        await axios.get(`https://pg-delsur.herokuapp.com/products?name=${name}`)
        // await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?name=${name}`)
        .then (results => {
            dispatch({
                type: GET_PRODUCT_BY_NAME,
                payload: results.data.products
            })
        })       
    };
}

export const getProductByNameReset = () => {
    return (dispatch) => {
        dispatch({
            type: PRODUCT_BY_NAME_RESET,
            payload: []
        })
    }
};