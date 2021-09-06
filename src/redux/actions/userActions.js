import axios from "axios"
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const PRODUCT_BY_CATEGORY = 'PRODCUT_BY_CATEGORY'

// export const getProducts = ()=>{
//     return function(dispatch){
//         let newData=data.map(item=>{
//             return{...item,
//                 image:img[item.image].default}})
//         return dispatch({type: GET_PRODUCTS, payload: newData})
//     }
// }

export const getProducts =()=>{
    return async function(dispatch){
        await axios.get('https://delsur-api-1.herokuapp.com/products')
        .then(results=>{
            dispatch({
                type:GET_PRODUCTS,
                payload: results.data
            })
        })
    }
}

export const getProductsbyCategory=(categoryName)=>{
    return async function(dispatch){
        await axios.get('https://delsur-api-1.herokuapp.com/products?category='+categoryName)
        .then(results =>{
            console.log(results)
            dispatch({
                type: PRODUCT_BY_CATEGORY,
                payload: results.data
            })
        })
    }
}