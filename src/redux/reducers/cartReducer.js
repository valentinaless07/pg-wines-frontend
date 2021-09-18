import Swal from 'sweetalert2'

const initialState = {
    cartState: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalPrice: [],
    idCheckout: ""
}

export default function cartReducer (state = initialState, action) {

    switch(action.type){
        case "ADD_CART_PRODUCT":
          
          if(action.payload.stock - action.payload.itemsAmount >= 0){
            
            
              Swal.fire('Producto agregado al carrito')
              localStorage.setItem("cart", JSON.stringify(state.cartState.concat(action.payload)))
              
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
            let cartStateDeleted = state.cartState.filter(el => el.id !== action.payload)
            localStorage.setItem("cart", JSON.stringify(cartStateDeleted))
            return{
              ...state,
              cartState: cartStateDeleted
            }

          case "EDIT_ITEMS_AMOUNT":
            
            let amount = state.cartState
            let product = amount[amount.findIndex(el => el.id === action.payload.id)]

            if(product.stock - action.payload.amount >= 0){
              product.itemsAmount = action.payload.amount
              localStorage.setItem("cart", JSON.stringify(amount))

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

           case "POST_CHECKOUT": 
           return {
             ...state,
            idCheckout: action.payload.data
           }
    
        
        default: return state
    }

}