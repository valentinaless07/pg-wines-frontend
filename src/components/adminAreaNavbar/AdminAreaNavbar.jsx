import React, { useEffect, useState } from 'react';
import styles from './AdminAreaNavbar.module.css'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';


const AdminAreaNavbar = () => {
    let location = useLocation();
  const history = useHistory()
  const [screenSize, setScreenSize] = useState(window.innerWidth);
    
    return (
      <nav className={styles.navbar}>
          <div className={styles.options__container}>
            <div className={styles.backIcon}><i onClick={() => location.pathname === "/adminArea" ? history.push("/") : history.push("/adminArea")} className="fas fa-arrow-circle-left"></i></div>
            <NavLink className={styles.navItem} activeClassName={styles.active} to="/offersManager"><span>{screenSize>500 ? 'Ofertas': <i className="fas fa-boxes"></i>}</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to="/manageProducts"><span>{screenSize>500 ? 'Productos': <i className="fas fa-percent"></i>}</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to='/brands?element=brands'><span>{screenSize>500 ? 'Marcas': <i className={`fas fa-wine-bottle ${styles.icon}`}></i>}</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to='/categories?element=categories'><span>{screenSize>500 ? 'Categorias': <i className={`fab fa-penny-arcade ${styles.icon}`}></i>}</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to='/gestionordenes'><span>{screenSize>500 ? 'Ordenes': <i className={`fab fa-penny-arcade ${styles.icon}`}></i>}</span></NavLink>
          </div>                
        </nav>
    );
}



export default AdminAreaNavbar