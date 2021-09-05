import React from 'react';
import styles from './ManageProductsScreen.module.css'
import { NavLink } from 'react-router-dom';


const ManageProductsScreen = () => {


    return (
        <div className={styles.manageProductsContainer}>
        <nav>
            <ul className={styles.nav}>
                <NavLink to="/home"><li>Volver a la página de inicio</li></NavLink>
                <NavLink to="createproduct"><li>Crear producto</li></NavLink>
                
            </ul>
        </nav>
        
        </div>
    );
}

export default ManageProductsScreen;
