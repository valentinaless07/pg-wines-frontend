const initialState = {
    categories: [],
    products: []
}

export default function manageProductsReducer (state = initialState, action) {

    switch(action.type){
        case "GET_CATEGORIES":
        return {
            ...state,
            categories: action.payload
        }

        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload
            }
        
        default: return state
    }

}