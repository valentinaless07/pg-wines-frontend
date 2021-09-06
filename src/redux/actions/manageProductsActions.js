import axios from "axios"

export function postProductCreated (payload) {
    
    return async function () {
        
        const res = await axios.post("https://delsur-api-1.herokuapp.com/product", payload)
        

        return res
    }
}

export function getCategories() {
    return async function(dispatch) {
         var json = await axios.get("https://delsur-api-1.herokuapp.com/categories")
         

         return dispatch({
             type: "GET_CATEGORIES",
             payload: json.data
         })
    }
 }

 export function getProducts () {
    return async function(dispatch) {
        var json = await axios.get("https://delsur-api-1.herokuapp.com/products")
        

        return dispatch({
            type: "GET_PRODUCTS",
            payload: json.data
        })
   }
   
 }

 export function deleteProduct (payload) {
    
    return async function () {
        
        
        const resp = await axios.delete("https://delsur-api-1.herokuapp.com/product/delete", {data: {id: payload}})
        
        console.log(resp)
        return resp
    }
 }