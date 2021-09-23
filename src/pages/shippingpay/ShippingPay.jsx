import React from 'react';
import uniqid from 'uniqid';
import styles from './ShippingPay.module.css';
import CartProduct from '../../components/cart_product/CartProduct';
import { getTotalPrice } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';


const ShippingPay = ({ cartState, getTotalPrice, totalPrice, idCheckout }) => {

    const history = useHistory()

    useEffect(() => {
        getTotalPrice()
        var container_checkout = document.getElementById("checkout_container")
        var script = document.createElement("script")
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
        script.type = "text/javascript"
        script.dataset.preferenceId = idCheckout
        container_checkout && container_checkout.appendChild(script)

         }, [idCheckout]);

    


    return <>
        <div className={styles.bodyshipping}>
            <div className={styles.titlestilos}>
                <h2>Completar Transaccion</h2>
            </div>
            <div className={styles.revisararticulo}>
                <h4>Revisar articulo y envio</h4>
            </div>
            <div className={styles.checkoutshipping}>
                <div className={styles.buydetails}>
                    <div className={styles.cart_product_container}>
                        {cartState && cartState.map(el =>
                        <div className={styles.cart_product}>
                        <div className={styles.img_container}>
                            <img src={el.image || el.photo[0]} alt="" />
                        </div>
                        <div className={styles.name_price_product}>
                            <p>{el.name}</p><p className={styles.cost}>Precio: ${el.cost}</p>
                        </div>
                        <p>Cantidad: {el.quantity}</p>
                        </div>
                            
                        )}
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,320L1440,224L1440,320L0,320Z"></path></svg>

                     
                    <div className={styles.addres}>
                        <div>
                            <h2>Enviar a</h2>
                        </div>
                        <div className={styles.lineaddres}></div>
                        <div className={styles.pais}>
                            <p>País o región</p>
                            <select name="" id="">
                                <option value="">Argentina</option>
                                <option value="">Bolivia</option>
                                <option value="">Brasil</option>
                                <option value="">Chile</option>
                                <option value="">Colombia</option>
                                <option value="">Estados Unidos</option>
                                <option value="">México</option>
                                <option value="">Nicaragua</option>
                                <option value="">Paraguay</option>
                                <option value="">Perú</option>
                                <option value="">Venezuela</option>
                                
                                

                            </select>
                        </div>
                        
                        <div className={styles.direccionenvio}>
                            <div>
                                <input type="text" placeholder="Direccion" />
                                <input type="text" placeholder="Direccion 2 (Opcional)" />
                            </div>
                        </div>
                        <div className={styles.ciudadestado}>
                            <div>
                                <input type="text" placeholder="Ciudad" />
                                <input type="text" placeholder="Estado, Provincia o Region" />
                                <input type="text" placeholder="Código Postal" />
                            </div>
                        </div>
                        
                        <div className={styles.numerotelefono}>
                            <div>
                                <input type="number" placeholder="Numero de telefono" />
                            </div>
                        </div>
                        <div className={styles.botonlisto}>
                            <div>
                                <button onClick={() => history.push("/payconfirmation")}>Listo</button>
                            </div>
                        </div>
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
        idCheckout: state.cart.idCheckout
        
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTotalPrice: () => dispatch(getTotalPrice()),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShippingPay);




