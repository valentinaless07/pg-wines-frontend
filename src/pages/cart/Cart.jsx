import React from 'react';
import styles from './Cart.module.css'
import {addCartProduct} from "../../redux/actions/cartActions"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from '../../components/cart_product/CartProduct';




const Cart = ({cartState}) => {

    function totalPrice () {
        let total = 0
        cartState.forEach(el => total += el.cost)
        return total
    }
    

    return (
        <div className={styles.container}>
            
            <Link to="/home" className={styles.backicon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>

            <div className={styles.title}>    
            <h1>Carrito de compras</h1>
            </div>

            <div className={styles.cart_container}>
                { cartState.length > 0 ?
                <div className={styles.cart_items_container}>
                    <div className={styles.cart_items}>
                        
                        {cartState && cartState.map(el => 
                        <CartProduct image={el.image} name={el.name} cost={el.cost} id={el.id}/>
                            )}

                    </div>
                    <div className={styles.total_products}>
                        <div className={styles.total_container}>
                            <div className={styles.cost}>
                            <p>Total</p><br/>
                            <b>${totalPrice()}</b>
                            </div>
                            <hr className={styles.hr}></hr>
                            <button className={styles.buttonSubmit}>CHECKOUT</button>
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
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addCartProduct: () => dispatch(addCartProduct())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
