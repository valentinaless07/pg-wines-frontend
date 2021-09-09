const initialState = {
    cartState: [],
    totalPrice: []
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

          case "EDIT_ITEMS_AMOUNT":
        
            let amount = state.cartState
            amount[amount.findIndex(el => el.id === action.payload.id)].itemsAmount = action.payload.amount
            return {
              ...state,
              cartState: amount
            } 
            
          case "GET_TOTAL_PRICE":
            let total = 0
            state.cartState.forEach(el => total += el.cost * el.itemsAmount)
          return{
            ...state,
            totalPrice: [total]
          }  

           
    
        
        default: return state
    }

}