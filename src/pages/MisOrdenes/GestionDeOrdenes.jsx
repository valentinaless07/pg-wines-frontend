import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './GestionDeOrdenes.module.css';
import { connect } from 'react-redux';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../redux/actions/orderActions';

const GestionDeOrdenes = ({ all_orders, getAllOrders }) => {
  useEffect(() => {
    getAllOrders()
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.ordeninfo}>
        <div>
          <h2>Historial de ordenes</h2>
          <div className={styles.selectorders}>
            <h4>Filtrar ordenes segun estado</h4>
            <select className={styles.customselect} name="" id="">
              <option value="">Creadas</option>
              <option value="">Procesando</option>
              <option value="">Canceladas</option>
              <option value="">Completas</option>
            </select>
          </div>

          <table>
            <tbody>
            <tr>
              <th>Numero de orden</th>
              <th>Fecha de compra</th>
              <th>Estatus</th>
              <th>Detalle de la orden</th>
            </tr>
            {all_orders?.length > 0 ?
              all_orders?.map(item => {
                var date = new Date(item.date);

                var formattedDate = format(date, "MMMM do, yyyy H:mma");

                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{formattedDate}</td>
                    <td>{item.status}</td>
                    <td><Link to={`/gestionorder/${item.id}`}>Ver</Link></td>
                  </tr>
                )
              })

              : <></>}
        </tbody>
          </table>
        </div>

      </div>
      <Footer />
    </React.Fragment>
  )
};

function mapStateToProps(state) {
  return {
    all_orders: state.orders.all_orders,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),



  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GestionDeOrdenes);