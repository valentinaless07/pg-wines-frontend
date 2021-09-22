import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './DetalleOrden.module.css';
import { getOrderDetails } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

const DetalleOrden = ({ getOrderDetails, orders_details }) => {

    const { id } = useParams()
    useEffect(() => {
        getOrderDetails(id);
    }, [id, getOrderDetails])

    const url = useLocation().search.split('=').slice(-1)[0]

    const formatDate = (date) => {
        var dateN = new Date(date);
        var formattedDate = format(dateN, "MMMM do, yyyy H:mma");
        return formattedDate;
    }

    const sumTotal = (products) => {
        let t = 0;
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            t += element.cost;
        }

        return t;
    }

    return (
        <>
            <Navbar />
            <div className={styles.detalledeordenes}>
                <div className={styles.datesorder}>
                    {orders_details.length > 0 ?
                        <ul>
                            <li>
                                <p className={styles.totalprice}>Total de orden</p>
                                <p className={styles.amountorder}>$ {sumTotal(orders_details[0]?.products)}</p>
                            </li>
                            <li>
                                <p className={styles.orderno}>Orden no. {orders_details[0]?.id}</p>
                                <p className={styles.orderdate}>Fecha: {formatDate(orders_details[0]?.date)}</p>
                            </li>
                        </ul>
                        : <></>}
                </div>
                <div className={styles.detalleitem}>
                    <table>

                        {
                            orders_details[0]?.products.map(p => {
                                console.log(orders_details)
                                return (
                                    <tr key={p.id}>
                                        <td><img src={p.image[0]} alt="" /></td>
                                        <td>{p.quantity}</td>
                                        <td>{p.name}</td>
                                        <td>${p.cost}</td>
                                        <td><Link to={`/product/${p.id}?ou=1${url}`}>Ver detalle de producto</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </table >
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
        getOrderDetails: (id) => dispatch(getOrderDetails(id)),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleOrden);