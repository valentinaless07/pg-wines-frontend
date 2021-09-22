import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './MisOrdenes.module.css';
import { getOrderHistory } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

const MisOrdenes = ({ orders, getOrderHistory }) => {
    useEffect(() => {
        getOrderHistory()
    }, [])
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
                            <th>Detalle de la orden</th>
                        </tr>
                        {orders.length > 0 ?
                            orders.map(item => {
                                var date = new Date(item.date);

                                var formattedDate = format(date, "MMMM do, yyyy H:mma");

                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{formattedDate}</td>
                                        <td>{item.status}</td>
                                        <td><Link to={`/order/${item.id}?ou=${item.userId}`}>Ver</Link></td>
                                    </tr>
                                )
                            })

                            : <></>}

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