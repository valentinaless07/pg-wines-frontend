const initialState = {
    cartState: []
}

export default function cartReducer (state = initialState, action) {

    switch(action.type){
        case "ADD_CART_PRODUCT":
          
          return {
            ...state,
            cartState: state.cartState.concat(action.payload)
            
          }
    

          case "DELETE_CART_PRODUCT":
            return{
              ...state,
              cartState: state.cartState.filter(el => el.id !== action.payload)
            }

           
    
        
        default: return state
    }

}