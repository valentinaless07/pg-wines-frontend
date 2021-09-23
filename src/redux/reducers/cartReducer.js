import Swal from 'sweetalert2'


const initialState = {
    cartState: [],
    totalPrice: [],
    idCheckout: "",
    userAdress: []
}


export default function cartReducer (state = initialState, action) {

    switch(action.type){
        case "ADD_CART_PRODUCT":
          
          if(action.payload.stock - action.payload.quantity >= 0){
            
            if(!JSON.parse(localStorage.getItem("auth"))?.loggedIn){
              localStorage.setItem("cart", JSON.stringify(state.cartState.concat(action.payload)))
            }
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
            let cartStateDeleted = state.cartState.filter(el => el.id !== action.payload)

            if(!JSON.parse(localStorage.getItem("auth"))?.loggedIn){
              localStorage.setItem("cart", JSON.stringify(cartStateDeleted))
            }
            
            return{
              ...state,
              cartState: cartStateDeleted
            }

          case "EDIT_ITEMS_AMOUNT":
            
            let amount = state.cartState
            let product = amount[amount.findIndex(el => el.id === action.payload.id)]

            if(product.stock - action.payload.amount >= 0){
              product.quantity = action.payload.amount
              
              if(!JSON.parse(localStorage.getItem("auth"))?.loggedIn){
                localStorage.setItem("cart", JSON.stringify(amount))
              }
              

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
            state.cartState?.forEach(el => total += el.cost * el.quantity)
          return{
            ...state,
            totalPrice: [total]
          }  

           case "POST_CHECKOUT": 
           return {
             ...state,
            idCheckout: action.payload.data
           }
           case "CART_STATE_LOGIN":
             
            
                return {
                  ...state,
                  cartState: action.payload
                }
            case "USER_ADDRESS":
              return{
                ...state,
                userAdress: action.payload
              }
             
             
    
        
        default: return state
    }

}