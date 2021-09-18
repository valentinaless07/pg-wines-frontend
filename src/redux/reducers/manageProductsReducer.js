const initialState = {
    categories: [],
    products: [],
    brands: [],
    packing: []
}

export default function manageProductsReducer (state = initialState, action) {

    switch(action.type){
        case "GET_CATEGORIES":
        return {
            ...state,
            categories: action.payload
        }

        case "GET_PRODUCTS_PAGINATION":
            return {
                ...state,
                products: action.payload
            }
        case "GET_PRODUCTS_PAGE":
            return {
                ...state,
                products: action.payload
            }     
        case "GET_BRANDS":
            return{
                ...state,
                brands: action.payload
            }
        case "GET_PACKING":
            return{
                ...state,
                packing: action.payload
            }
        case "GET_ALL_PRODUCTS_SLIDER":
            return{
                ...state,
                products: action.payload
            }
        
        default: return state
    }

}