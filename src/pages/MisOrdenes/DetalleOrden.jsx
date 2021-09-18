import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './DetalleOrden.module.css';
import { getOrderDetails } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';

const DetalleOrden = () => {

    return (
        <>
        <Navbar />
        <div className={styles.detalledeordenes}>
            <div className={styles.datesorder}>
                <ul>
                    <li>
                        <p className={styles.totalprice}>Total de orden</p>
                        <p className={styles.amountorder}>Monto</p>
                    </li>
                    <li>
                        <p className={styles.orderno}>Orden no.</p>
                        <p className={styles.orderdate}>Fecha</p>
                    </li>
                </ul>
            </div>
            <div className={styles.detalleitem}>
                <img src="https://www.fullescabio.com/productos/1630611865/01_1630611865.jpg" alt="" />
                <p>Nombre del producto</p>
                <p> X Cantidad comprada</p>
                <p><a href="">Ver detalle de producto</a></p>
            </div>
        </div>
        <Footer />
        </>
    )
};

function mapStateToProps(state) {
    return {
        orders_details: state.orders.orders_details,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getOrderDetails: () => dispatch(getOrderDetails()),
        
       

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleOrden);