import React from 'react';
import styles from './adminArea.module.css'
import { connect } from 'react-redux';
import AdminAreaNavbar from '../../components/adminAreaNavbar/AdminAreaNavbar';


const AdminArea = ({authState}) => {

  

    return (
        <div className={styles.adminArea}>
            <AdminAreaNavbar/>
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