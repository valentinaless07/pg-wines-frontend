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

 export function getProductsPagination () {
    return async function(dispatch) {
        var json = await axios.get("https://pg-delsur.herokuapp.com/products?itemsPerPage=20&orderBy=id")
        

        return dispatch({
            type: "GET_PRODUCTS_PAGINATION",
            payload: json.data
        })
   }
   
 }

 export const getProductsPage=(page)=>{
    return async function(dispatch){
        await axios.get("https://pg-delsur.herokuapp.com/products?itemsPerPage=20&orderBy=id&page="+page)
        .then(results=>{
            dispatch({
                type:"GET_PRODUCTS_PAGE",
                payload: results.data
            })
        })
    }
}


 export function deleteProduct (payload) {
    
    return async function () {
        
        
        const resp = await axios.delete("https://pg-delsur.herokuapp.com/products/delete", {data: {id: payload}})
        
        return resp
    }
 }

 export function updateProduct (payload) {
    
    return async function () {
        
        const respuesta = await axios.put("https://pg-delsur.herokuapp.com/products/update", payload)
        console.log(respuesta)
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