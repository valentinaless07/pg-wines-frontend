import React from 'react';
import styles from './CartProduct.module.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';




const CartProduct = (props) => {

    const [cantidadItems, setCantidadItems] = useState(1)

    function sum (){
        setCantidadItems(cantidadItems + 1)
    }

    function res () {
        setCantidadItems(cantidadItems - 1)
    }

    return (
        <div className={styles.cart_product}>
                            
                            <img src={props.image} alt="" />
                            <div className={styles.name_price_product}>
                                <p>{props.name}</p><p className={styles.cost}>Precio: ${props.cost}</p>
                            </div>
                            <p>Cantidad: {cantidadItems}</p>
                            <div className={styles.icons_container}>
                            <i onClick={sum} className="fas fa-plus-circle fa-2x"></i>
                            {cantidadItems > 1 ?
                            <i onClick={res} className="fas fa-minus-circle fa-2x"></i>
                            :
                            <i className="fas fa-trash-alt fa-2x"></i>
                            }
                            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      cartState: state.cart.cartState,
    };
  }
  
  

export default connect(mapStateToProps)(CartProduct);