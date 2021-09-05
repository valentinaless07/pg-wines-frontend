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