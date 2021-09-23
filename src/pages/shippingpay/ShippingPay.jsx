import React from 'react';
import uniqid from 'uniqid';
import styles from './ShippingPay.module.css';
import CartProduct from '../../components/cart_product/CartProduct';
import { getTotalPrice } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2'
import axios from "axios"

const ShippingPay = ({ cartState, getTotalPrice, totalPrice, idCheckout, authState, stateAddress }) => {

    const history = useHistory()
    
    const [modificaciones, setModificaciones] = useState(false)
    const [shippingData, setShippingData] = useState({
        country: stateAddress.length > 0? stateAddress[stateAddress.length-1].country : "",
        province: stateAddress.length > 0? stateAddress[stateAddress.length-1].province : "",
        city: stateAddress.length > 0? stateAddress[stateAddress.length-1].city : "",
        address: stateAddress.length > 0? stateAddress[stateAddress.length-1].address : "",
        zipCode: stateAddress.length > 0? stateAddress[stateAddress.length-1].zipCode : ""
    })

    useEffect(() => {
        getTotalPrice()
        var container_checkout = document.getElementById("checkout_container")
        var script = document.createElement("script")
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
        script.type = "text/javascript"
        script.dataset.preferenceId = idCheckout
        container_checkout && container_checkout.appendChild(script)

         }, [idCheckout]);

         

         function handleChange (e) {
             setModificaciones(true)
            setShippingData({
                ...shippingData,
                [e.target.name] : e.target.value
            })
    
            
        }

        function validate(input) {
            let errors = {}
    
            if(!input.country){
                errors.country = "Seleccione un país"
            }
            else if(!input.province){
                errors.province = "Ingrese un Estado, Provincia o Región"
            }

            else if(!input.city){
                errors.city = "Ingrese una ciudad"
            }

            else if(!input.address){
                errors.address = "Ingrese una dirección"
            }

            else if(!input.zipCode){
                errors.zipCode = "Ingrese un código postal"
            }
    
            return errors
    
        }

        function handleSubmit (e) {
            let validateSubmit = validate(shippingData)
        
            if(Object.keys(validateSubmit).length === 0){
                if(modificaciones){
                    let res = axios.post("https://pg-delsur.herokuapp.com/address/"+authState.uid, shippingData)
                
                    history.push("/payconfirmation")
                }
                else{
                    history.push("/payconfirmation")
                }
                
        }
        else{
        Swal.fire('Completar todos los campos')
        }
            
        }


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
                        <div key={uniqid()} className={styles.cart_product}>
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
                            <select name="country" id="" defaultValue={shippingData.country.length > 0 ? shippingData.country : "Selecciona un país"} onChange={e => handleChange(e)}>
                                <option disabled>Selecciona un país</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                                <option value="México">México</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Perú">Perú</option>
                                <option value="Venezuela">Venezuela</option>
                                
                                

                            </select>
                        </div>
                        
                        <div className={styles.direccionenvio}>
                            <div>
                                <input name="address" value={shippingData.address} type="text" placeholder="Direccion" onChange={e => handleChange(e)}/>
                                <input name="city" value={shippingData.city} type="text" placeholder="Ciudad" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <div className={styles.ciudadestado}>
                            <div>
                                
                                <input name="province" value={shippingData.province} type="text" placeholder="Estado, Provincia o Region" onChange={e => handleChange(e)}/>
                                <input name="zipCode" type="text" value={shippingData.zipCode} placeholder="Código Postal" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        
                        
                        <div className={styles.botonlisto}>
                            <div>
                                <button onClick={(e) => handleSubmit(e)}>Listo</button>
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
        idCheckout: state.cart.idCheckout,
        authState: state.auth,
        stateAddress: state.cart.userAdress,
        
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTotalPrice: () => dispatch(getTotalPrice()),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShippingPay);




