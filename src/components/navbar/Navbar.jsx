import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthContext from '../../auth/AuthContext';
import { types } from '../../types/types';
import cart from "./cart-icon.svg"
import search from "./search.svg"

const Navbar = () => {
    const { user: { name }, dispatch } = useContext(AuthContext);
    const history = useHistory();



    const handleLogout = () => {
        history.replace('/login/24');
        dispatch({type: types.logout});
    }
   

    return (
        <nav className={styles.container}>
            <div className={styles.logo_searchbar_login}>
                <div className={styles.logo_container}>
                    <NavLink className={styles.logo} to="/">Bodegas del Sur</NavLink>
                </div>

                <div className={styles.about_container}>
                    <span>Sobre Nosotros</span>
                </div>

                <div className={styles.searchbar_container}>
                    
                    <input className={styles.searchBar} placeholder="Buscar Bebidas..." type="search"/>
                    
                    
                </div>

                <div className={styles.cart_login}>
                    <span>Crear tu cuenta</span>
                    <span>Iniciar Sesión</span>
                    <img src={cart} alt="" />
                    
                </div>
                
            </div>
            
            
        </nav>
    );

   
}

export default Navbar;
