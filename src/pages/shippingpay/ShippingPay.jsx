import React, { useEffect } from 'react';
import styles from './ShippingPay.module.css';


const ShippingPay = () => {
    return <>
        <div className={styles.bodyshipping}>
            <div className={styles.titlestilos}>
                <h2>Completar Transaccion</h2>
            </div>
            <div className={styles.revisararticulo}>
                <h4>Revisar articulo y envio</h4>
            </div>
            <div className={styles.buydetails}>
                <div>
                    <div className={styles.flexboxshopping}>
                        <div>
                            <img src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/167/197/products/kunuk-1080x10801-0d994dd4544757b23c16140243878594-1024-1024.png" alt="" />
                        </div>
                        <div>
                            <h4>producto</h4>
                            <h5>{'Tamaño'}</h5>
                            <p>PRECIO</p>
                            <label htmlFor="">Cantidad</label>
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            <button>Eliminar</button>
                            <div className={styles.logistic}>
                                <div>
                                    <h5>Entrega</h5>
                                </div>
                                <div className={styles.radiobutton}>
                                    <span>
                                        <input type="radio"></input>
                                    </span>
                                    <p>Entrega prevista:{'fecha'}</p>
                                    <div className={styles.serviceprice}>
                                        <h4>Gratis</h4>
                                    </div>
                                </div>
                                <div className={styles.radiobutton}>
                                    <span>
                                        <input type="radio"></input>
                                    </span>
                                    <p>Entrega prevista:{'fecha'}</p>
                                    <div className={styles.serviceprice}>
                                        <h4>$300</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <hr />
                <div>

                    <div className={styles.flexboxshopping}>
                        <div>
                            <img src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/167/197/products/kunuk-1080x10801-0d994dd4544757b23c16140243878594-1024-1024.png" alt="" />
                        </div>
                        <div>
                            <h4>producto</h4>
                            <h5>{'Tamaño'}</h5>
                            <p>PRECIO</p>
                            <label htmlFor="">Cantidad</label>
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            <button>Eliminar</button>
                            <div className={styles.logistic}>
                                <div>
                                    <h5>Entrega</h5>
                                </div>
                                <div className={styles.radiobutton}>
                                    <span>
                                        <input type="radio"></input>
                                    </span>
                                    <p>Entrega prevista:{'fecha'}</p>
                                    <div className={styles.serviceprice}>
                                        <h4>Gratis</h4>
                                    </div>
                                </div>
                                <div className={styles.radiobutton}>
                                    <span>
                                        <input type="radio"></input>
                                    </span>
                                    <p>Entrega prevista:{'fecha'}</p>
                                    <div className={styles.serviceprice}>
                                        <h4>$300</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className={styles.addres}>
                <div>
                    <h2>Enviar a</h2>
                </div>
                <div className={styles.lineaddres}></div>
                <div className={styles.pais}>
                    <p>País o región</p>
                    <select name="" id="">
                        <option value="">usa</option>
                        <option value="">nic</option>
                    </select>
                </div>
                <div className={styles.datospersonales}>
                    <div>
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Apellido" />
                    </div>
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
                <div className={styles.correoelectronico}>
                    <div>
                        <input type="text" placeholder="Correo electronico" />
                        <input type="text" placeholder="Confirmar correo electronico" />
                    </div>
                </div>
                <div className={styles.numerotelefono}>
                    <div>
                        <input type="number" placeholder="Numero de telefono" />
                    </div>
                </div>
                <div className={styles.botonlisto}>
                    <div>
                        <button>Listo</button>
                    </div>
                </div>
            </div>



        </div>


    </>
}

export default ShippingPay;



