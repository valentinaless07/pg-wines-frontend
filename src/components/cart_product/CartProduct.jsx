import React from 'react';
import styles from './CartProduct.module.css'
import { connect } from 'react-redux';
import { useState } from 'react';
import { deleteCartProduct, getTotalPrice } from '../../redux/actions/cartActions';
import { editItemsAmount } from '../../redux/actions/cartActions';
import { useEffect } from 'react';




const CartProduct = (props) => {


    let amount = props.itemsAmount
    const [cantidadItems, setCantidadItems] = useState(amount)

    useEffect(() => {
        props.editItemsAmount({ id: props.id, amount: amount })
    }, [amount, props]);

    function sum (){
        props.editItemsAmount({id: props.id, amount: cantidadItems + 1})
        props.getTotalPrice()
        let item = props.cartState.find(el => el.id ===props.id).itemsAmount
        setCantidadItems(item)

    }

    function res () {
        props.editItemsAmount({id: props.id, amount: cantidadItems - 1})
        props.getTotalPrice()
        let item = props.cartState.find(el => el.id ===props.id).itemsAmount
        setCantidadItems(item)
    }

    function handleDelete() {
        props.deleteCartProduct(props.id)
        props.getTotalPrice()
    }

    return (
        <div className={styles.cart_product}>
            <div className={styles.img_container}>
                <img src={props.image} alt="" />
            </div>
            <div className={styles.name_price_product}>
                <p>{props.name}</p><p className={styles.cost}>Precio: ${props.cost}</p>
            </div>
            <p>Cantidad: {cantidadItems}</p>
            <div className={styles.icons_container}>
                {props.isCheckout ? <></> :
                    <i onClick={sum} className="fas fa-plus-circle fa-2x"></i>
                }
                {cantidadItems > 1 && !props.isCheckout ?
                    <i onClick={res} className="fas fa-minus-circle fa-2x"></i>
                    : ''}
                {!props.isCheckout ?

                    <i onClick={handleDelete} className="fas fa-trash-alt fa-2x"></i>
                    : ''}

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartState: state.cart.cartState
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCartProduct: (id) => dispatch(deleteCartProduct(id)),
        editItemsAmount: (amount) => dispatch(editItemsAmount(amount)),
        getTotalPrice: () => dispatch(getTotalPrice())

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);