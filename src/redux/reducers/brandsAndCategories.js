let initialState = {
    brands: [],
    categories: [],
    mercadoPagoData: {}
}

const brandsAndsCategories = (state=initialState, action) =>{
    switch(action.type){
        
        case 'GET_INFO_CATEGORIES':
            return{
                ...state,
                categories: action.payload
            }

        case 'GET_INFO_BRANDS':
            return{
                ...state,
                brands: action.payload
            }

        case 'MERCADO_PAGO':
            return{
                ...state,
                mercadoPagoData:action.payload
            }

        default:
            return state
    }
}

export default brandsAndsCategories