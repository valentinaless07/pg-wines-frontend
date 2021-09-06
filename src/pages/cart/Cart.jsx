import React from 'react';
import styles from './Cart.module.css'
import {addCartProduct} from "../../redux/actions/cartActions"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';




const Cart = () => {

    

    return (
        <div className={styles.container}>
            
            <Link to="/home" className={styles.backicon}><i className="fas fa-arrow-circle-left fa-3x"></i></Link>

            <div className={styles.title}>    
                <h1>Carrito de compras</h1>
            </div>

            <div className={styles.cart_container}>
                <div className={styles.cart_items_container}>
                    <div className={styles.cart_items}>
                        
                    </div>
                    <div className={styles.total_products}>
                        <div className={styles.total_container}>
                            <div className={styles.cost}>
                            <p>Total</p><br/>
                            <b>$100</b>
                            </div>
                            <hr className={styles.hr}></hr>
                            <button className={styles.buttonSubmit}>CHECKOUT</button>
                        </div>
                    </div>
                </div>
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
