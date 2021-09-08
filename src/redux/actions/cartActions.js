
export function addCartProduct (payload) {
    console.log(payload)
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
