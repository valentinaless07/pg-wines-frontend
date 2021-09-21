import React from 'react';
import styles from './adminArea.module.css'
import { connect } from 'react-redux';
import AdminAreaNavbar from '../../components/adminAreaNavbar/AdminAreaNavbar';


const AdminArea = ({authState}) => { 

    return (
        <div className={styles.adminArea}>
            <AdminAreaNavbar/>
            <div className={styles.admin_container}>
                <h1>Bienvenido Administrador</h1>
                <img className={styles.admin__photo} src={authState.photoURL} alt="" />
                <h1>{authState.displayName || 'UserAdmin'}</h1>
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