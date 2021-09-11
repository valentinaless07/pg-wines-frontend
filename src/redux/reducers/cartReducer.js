import Swal from 'sweetalert2'

const initialState = {
    cartState: [],
    totalPrice: []
}

export default function cartReducer (state = initialState, action) {

    switch(action.type){
        case "ADD_CART_PRODUCT":
          
          if(action.payload.stock - action.payload.itemsAmount >= 0){
            
            
              Swal.fire('Producto agregado al carrito')
            return {
            ...state,
            cartState: state.cartState.concat(action.payload)
            
             } 
            
          
        }
        else{
          Swal.fire({icon: "error", text: "Este producto no tiene suficiente stock"})
          return{...state}
        }
    

          case "DELETE_CART_PRODUCT":
            return{
              ...state,
              cartState: state.cartState.filter(el => el.id !== action.payload)
            }

          case "EDIT_ITEMS_AMOUNT":
            
            let amount = state.cartState
            let product = amount[amount.findIndex(el => el.id === action.payload.id)]

            if(product.stock - action.payload.amount >= 0){
              product.itemsAmount = action.payload.amount

              return {
                ...state,
                cartState: amount
              } 
            }
            
            else{
              Swal.fire({icon: "error", text: "Este producto no tiene suficiente stock"})
              return{
                ...state
              }
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