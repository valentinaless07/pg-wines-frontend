import React, { useEffect } from 'react';
import styles from './Cart.module.css'
import {addCartProduct} from "../../redux/actions/cartActions"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from '../../components/cart_product/CartProduct';
import { getTotalPrice } from '../../redux/actions/cartActions';
import axios from "axios"
import { postCheckout } from '../../redux/actions/cartActions';
import { useHistory } from 'react-router';


const Cart = ({cartState, getTotalPrice, totalPrice, postCheckout, idCheckout, authState}) => {
    const history = useHistory()
    
    useEffect(() => {
        
        getTotalPrice()
        
    } , [getTotalPrice]);
    

    

    async function handleCheckout () {
        
        let id = authState.uid
        console.log(id)
        await postCheckout({product: cartState, orderId: id})
        history.push("/checkout")
    }
    
    

    return (
        <div className={styles.container}>
            
            <Link to="/" className={styles.backicon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>

            <div className={styles.title}>    
            <h1>Carrito de compras</h1>
            </div>

            <div className={styles.cart_container}>
                { cartState.length > 0 ?
                <div className={styles.cart_items_container}>
                    <div className={styles.cart_items}>
                        
                        {cartState && cartState.map(el => 
                        <CartProduct image={el.image || el.photo} name={el.name} cost={el.cost} id={el.id} key={el.id} quantity={el.quantity}
                         isCheckout={false}/>
                            )}

                    </div>
                    <div className={styles.total_products}>
                        <div className={styles.total_container}>
                            <div className={styles.cost}>
                            <p>Total</p><br/>
                            <b>${totalPrice}</b>
                            </div>
                            <hr className={styles.hr}></hr>
                            <p onClick={handleCheckout} className={styles.buttonSubmit}>CHECKOUT</p>
                        </div>
                    </div>
                </div>
               : <div className={styles.carritoVacio}>El carrito de compras está vacío.</div> }
            </div>
        
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return {
      cartState: state.cart.cartState,
      totalPrice: state.cart.totalPrice,
      idCheckout: state.cart.idCheckout,
      authState: state.auth,

    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addCartProduct: () => dispatch(addCartProduct()),
      getTotalPrice: () => dispatch(getTotalPrice()),
      postCheckout: (products) => dispatch(postCheckout(products))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
