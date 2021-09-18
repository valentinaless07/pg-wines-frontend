import axios from "axios"

export function addCartProduct (payload) {
    
    return {
        type: "ADD_CART_PRODUCT",
        payload
    }
}

export function deleteCartProduct(payload) {
    
    return {
        type: "DELETE_CART_PRODUCT",
        payload
    }
}

export function editItemsAmount(payload){
    
    return {
        type: "EDIT_ITEMS_AMOUNT",
        payload
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
        console.log(res)
    return dispatch({
        type: "POST_CHECKOUT",
        payload: res
    })
    }
}
