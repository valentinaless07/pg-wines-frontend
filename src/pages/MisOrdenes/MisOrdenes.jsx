import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './MisOrdenes.module.css';
import { getOrderHistory } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';

const MisOrdenes = () => {
    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.ordeninfo}>
                <div>
                    <h2>Historial de ordenes</h2>
                    <table>
                        <tr>
                            <th>Numero de orden</th>
                            <th>Fecha de compra</th>
                            <th>Estatus</th>
                            <th>Total</th>
                            <th>Detalle de la orden</th>
                        </tr>
                        <tr>
                            <td>345</td>
                            <td>24-09-21</td>
                            <td>Procesando</td>
                            <td>$1200</td>
                            <td><a href="">Ver</a></td>
                        </tr>
                        <tr>
                            <td>345</td>
                            <td>24-09-21</td>
                            <td>Procesando</td>
                            <td>$1200</td>
                            <td><a href="">Ver</a></td>
                        </tr>
                        <tr>
                            <td>345</td>
                            <td>24-09-21</td>
                            <td>Procesando</td>
                            <td>$1200</td>
                            <td><a href="">Ver</a></td>
                        </tr>
                    </table>
                </div>

            </div>
            <Footer />
        </React.Fragment>
    )
};

function mapStateToProps(state) {
    return {
        orders: state.orders.orders,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getOrderHistory: () => dispatch(getOrderHistory()),
        
       

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisOrdenes);