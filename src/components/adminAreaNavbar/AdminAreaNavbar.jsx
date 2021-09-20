import React from 'react';
import styles from './AdminAreaNavbar.module.css'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';


const AdminAreaNavbar = () => {
    let location = useLocation();
  const history = useHistory()
    
    return (
      <nav className={styles.navbar}>
          <div className={styles.options__container}>
            <div className={styles.backIcon}><i onClick={() => location.pathname === "/adminArea" ? history.push("/") : history.push("/adminArea")} className="fas fa-arrow-circle-left fa-2x"></i></div>
            <NavLink className={styles.navItem} activeClassName={styles.active} to="/manageProducts"><span>Productos</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to="/offersManager"><span>Ofertas</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to='/brands?element=brands'><span>Marcas</span></NavLink>
            <NavLink className={styles.navItem} activeClassName={styles.active} to='/categories?element=categories'><span>Categorias</span></NavLink>
            {/* <span>Packing</span> */}
          </div>                
        </nav>
    );
}



export default AdminAreaNavbar