import axios from "axios"

export function addCartProduct (payload) {
    return async function (dispatch) {
    
        if(payload.stock - payload.quantity >= 0){
    let auth = JSON.parse(localStorage.getItem("auth"))
            if(auth?.loggedIn){
              await axios.post("https://pg-delsur.herokuapp.com/carts/addCartItem/"+auth.uid, {id: payload.id, quantity: payload.quantity})
              
            }
        }

    return dispatch ({
        type: "ADD_CART_PRODUCT",
        payload
    })
}
}

export function deleteCartProduct(payload) {
    
    return async function (dispatch) {
        
        let auth = JSON.parse(localStorage.getItem("auth"))
            if(auth?.loggedIn === true){
              await axios.delete("https://pg-delsur.herokuapp.com/carts/deleteCartItem/"+auth.uid+"/"+payload)
             
            }

        return dispatch ({
            type: "DELETE_CART_PRODUCT",
            payload
        })

    }

}

export function editItemsAmount(payload){
    return async function (dispatch) {
    
        let auth = JSON.parse(localStorage.getItem("auth"))
        if(auth?.loggedIn === true){
          await axios.put("https://pg-delsur.herokuapp.com/carts/editCartQuantity/"+auth.uid, {id: payload.id, quantity: payload.amount})
         
        }
    
    return dispatch({
        type: "EDIT_ITEMS_AMOUNT",
        payload
    })
}
}

export function getTotalPrice () {
    return {
        type: "GET_TOTAL_PRICE"
    }
}




export function postCheckout(payload) {
    return async function (dispatch){

     const res = await axios.post("https://pg-delsur.herokuapp.com/pay", payload)        
          


    return dispatch({
        type: "POST_CHECKOUT",
        payload: res
    })
    }
}

export function cartStateLogin (payload) {
    return async function (dispatch) {
        const respuesta = await axios.get("https://pg-delsur.herokuapp.com/carts/getAllCartItems/"+payload)
            
        return dispatch({
            type: "CART_STATE_LOGIN",
            payload: respuesta.data.products
        })
    }
}

export function userAddress (userId) {
    return async function (dispatch) {
        var address = await axios.get("https://pg-delsur.herokuapp.com/address/"+ userId)
        
        return dispatch({
            type: "USER_ADDRESS",
            payload: address.data
        })
    }
}