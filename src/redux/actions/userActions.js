import axios from "axios"
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const FILTER_BY = 'FILTER_BY'

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
        axios.get('https://delsur-api-1.herokuapp.com/products')
        .then(results=>{
            console.log(results.data)
            dispatch({
                type:GET_PRODUCTS,
                payload: results.data
            })
        })
    }
}