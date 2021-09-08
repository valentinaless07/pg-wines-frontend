
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


