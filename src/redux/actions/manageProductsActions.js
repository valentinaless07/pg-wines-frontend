import axios from "axios"

export function postProductCreated (payload) {
    
    return async function () {
        
        const res = await axios.post("https://pg-delsur.herokuapp.com/products", payload)
        

        return res
    }
}

export function getCategories() {
    return async function(dispatch) {
         var json = await axios.get("https://pg-delsur.herokuapp.com/categories")
         

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
        
        return resp
    }
 }

 export function updateProduct (payload) {
    
    return async function () {
        
        const respuesta = await axios.put("https://delsur-api-1.herokuapp.com/product/update", payload)
        
        return respuesta
    }
 }

 export function getBrands() {
    return async function(dispatch) {
         var json = await axios.get("https://pg-delsur.herokuapp.com/brands")
         
        

         return dispatch({
             type: "GET_BRANDS",
             payload: json.data
         })
    }
 }

 export function getPacking() {
    return async function(dispatch) {
         var json = await axios.get("https://pg-delsur.herokuapp.com/packing")
         
        

         return dispatch({
             type: "GET_PACKING",
             payload: json.data
         })
    }
 }