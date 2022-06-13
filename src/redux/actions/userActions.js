import axios from "axios"
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const PRODUCT_BY_CATEGORY = 'PRODCUT_BY_CATEGORY'
export const PRODUCTS_PAGE = 'PODUCTS_PAGE'
export const PRODUCTS_FILTERED = 'PRODUCTS_FILTERED'

export const getProducts =()=>{
    return async function(dispatch){
        await axios.get('https://pg-delsur.herokuapp.com/resetdb')

        await axios.get('https://pg-delsur.herokuapp.com/products?itemsPerPage=12')
        // await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?itemsPerPage=12`)
        .then(results=>{
            dispatch({
                type:GET_PRODUCTS,
                payload: results.data
            })
        })
    }
}

export const getProductsByPage=(categoryId, initPrice, finalPrice, page)=>{
    return async function(dispatch){
        await axios.get(`https://pg-delsur.herokuapp.com/products?itemsPerPage=12&categoryId=${categoryId}&initPrice=${initPrice}&finalPrice=${finalPrice}&page=${page}`)
        .then(results=>{
            dispatch({
                type:PRODUCTS_PAGE,
                payload: results.data
            })
        })
    }
}

export const getFilteredProductsList=({categoryId, initPrice, finalPrice})=>{
    // console.log(categoryId, initPrice, finalPrice)
    console.log('hello from action')
    console.log(categoryId)
    return async function(dispatch){
        await axios.get(`https://pg-delsur.herokuapp.com/products?itemsPerPage=12&page=1&categoryId=${categoryId}&initPrice=${initPrice}&finalPrice=${finalPrice}`)
        // await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products?itemsPerPage=12&page=1&categoryId=${categoryId}&initPrice=${initPrice}&finalPrice=${finalPrice}`)
        .then(results=>{
            // console.log(results)
            dispatch({
                type: PRODUCTS_FILTERED,
                payload: results.data
            })
        })
    }
}