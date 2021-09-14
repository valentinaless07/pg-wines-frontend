import React from 'react';
import styles from './adminArea.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';



const AdminArea = ({authState}) => {

  

    return (
        <div className={styles.adminArea}>
            <nav>
          <div className={styles.backIcon}><NavLink to="/"><i className="fas fa-arrow-circle-left fa-3x"></i></NavLink></div>
            <ul className={styles.nav}>
                
                <div className={styles.manageProductIcon}><NavLink to="/manageProducts"><li>Productos</li></NavLink></div>
                <div className={styles.offersManagerIcon}><NavLink to="/offersManager"><li>Ofertas</li></NavLink></div>
                <li>Marcas</li>
                <li>Packing</li>
                <li>Categorías</li>
                
            </ul>
        </nav>
        <div className={styles.h1_container}>
            <h1>Bienvenido Administrador, <br/>{authState.displayName}.</h1>
        </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminArea);