import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './GestionDetalleDeOrdenes.module.css';
import { getOrderDetails, updateOrder, updateShippingStatus } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const GestionDetalleDeOrdenes = ({ getOrderDetails, orders_details, updateOrder, updateShippingStatus }) => {

    const { id } = useParams()
    useEffect(() => {
        getOrderDetails(id);
    }, [id])

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

    const updateStatus = (e) => {
        e.preventDefault();
        updateOrder(orders_details[0].userId, e.target.value);
        new Swal("Exito", "Estado actualizado", "success");
    }

    const sendShipping = () => {
        updateShippingStatus(orders_details[0].id);
        new Swal("Exito", "Tu orden ha sido despachada!", "success");
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

                <div className={styles.selectestado}>
                    {orders_details[0]?.status !== 'approved' ?
                        <>
                            <h4>Cambiar su estado de: <span>{orders_details[0]?.status}</span>  A</h4>
                            <select className={styles.customselectestado} onChange={updateStatus}>
                                <option value="" selected>Seleccionar...</option>
                                {
                                    orders_details[0]?.status === 'cart' ?
                                
                                <><option value="pending">Procesando</option><option value="cancelled">Cancelada</option></>

                                : 
                                <></>


                                }

                                {
                                orders_details[0]?.status === 'pending' ?
                                
                                <><option value="approved">Aprobada</option><option value="cancelled">Cancelada</option></>

                                : 
                                    <></>
                                }
                            </select>
                        </>
                        : <div className={styles.shippingboton}>
                            <h3>Hacer envio</h3>
                            <button className={styles.botonstyle} onClick={sendShipping}>
                                <FontAwesomeIcon className={styles.truckstyle} icon={faTruck} />
                            </button>
                        </div>

                    }
                </div>

                <div className={styles.detalleitem}>
                    <table>

                        {
                            orders_details[0]?.products.map(p => {
                                // console.log(orders_details)
                                return (
                                    <tr key={p.id}>
                                        <td><img src={p.image[0]} alt="" /></td>
                                        <td>{p.quantity}</td>
                                        <td>{p.name}</td>
                                        <td>${p.cost}</td>
                                        <td><Link to={`/product/${p.id}`}>Ver detalle de producto</Link></td>

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
        updateOrder: (id, status) => dispatch(updateOrder(id, status)),
        updateShippingStatus: (id) => dispatch(updateShippingStatus(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GestionDetalleDeOrdenes);