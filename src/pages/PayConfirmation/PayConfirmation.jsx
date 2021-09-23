import React from 'react';
import uniqid from 'uniqid';
import styles from './PayConfirmation.module.css';
import CartProduct from '../../components/cart_product/CartProduct';
import { getTotalPrice } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

const PayConfirmation = ({ cartState, getTotalPrice, totalPrice, idCheckout }) => {

    const history = useHistory()


    useEffect(() => {
        idCheckout.length < 1 ? history.push("/cart") :
        getTotalPrice()
        var container_checkout = document.getElementById("checkout_container")
        var script = document.createElement("script")
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
        script.type = "text/javascript"
        script.dataset.preferenceId = idCheckout
        container_checkout && container_checkout.appendChild(script)

         }, [idCheckout]);

         console.log(cartState)


    return <>
        
                    
        <div className={styles.confirmpay}>
                <div className={styles.title_container}>
                    <h1>Confirmación de compra</h1>
                </div>
                    <div>
                    
                        <div className={styles.container_tables}>
                        
                            <table>
                                {cartState && cartState.map(el =>
                                    <tbody key={uniqid()}>
                                        <tr>
                                            <td className={styles.labelenvio}>{el.name}({el.quantity})</td>
                                            <td className={styles.labelmount}>${el.cost}</td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles.labelenvio}>Envio</td>
                                        <td className={styles.labelmount}>Gratis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.lineacheckout}></div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={styles.labeltotaltext}>Total de la compra: </td>
                                    <td className={styles.labeltotalmount}>${totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.botonconfirmar}>
                            <div id="checkout_container" className="checkout_container">
                                
                                
                            </div>
                        </div>
                    </div>   
               </div>


               
    </>
}



const mapStateToProps = (state) => {
    return {
        cartState: state.cart.cartState,
        totalPrice: state.cart.totalPrice,
        idCheckout: state.cart.idCheckout,
        
        
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTotalPrice: () => dispatch(getTotalPrice()),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PayConfirmation);

