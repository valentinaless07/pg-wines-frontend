import React, { useState } from "react";
import { connect } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { getFirstName } from '../../helpers/helpers';
import styles from "./Navbar.module.css";
import stylesMobile from "./NavbarMobile.module.css";
import cart from "./cart-icon.svg";
import search from "./search.svg";
// import logo from "./logo.png";
import { logOutAction } from '../../redux/actions/authActions';
import favorite from "./favorite-icon.svg";
import bars from "./bars.svg";

const Navbar = ({ authState, logOutAction }) => {
  const history = useHistory();

  const handleLogout = () => {
    // history.replace('/login');
    history.push('/home');
    logOutAction();
  }

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [barsStatus, setBarsStatus] = useState("off");

  window.addEventListener("resize", changeScreen);

  function changeScreen(e) {
    setScreenSize(e.target.innerWidth);
  }

  function changeBarsStatus() {
    if (barsStatus === "off") {
      setBarsStatus("on");
    } else {
      setBarsStatus("off");
    }
  }

  return screenSize > 1100 ? (
    // NAVBAR CON WIDTH MAYOR A 1000
    <nav className={styles.container}>
      <div className={styles.logo_searchbar_login}>
        <div className={styles.logo_container}>
          <NavLink className={styles.logo} to="/">
            <h1>BODEGAS DEL SUR</h1>
          </NavLink>
        </div>

        <NavLink to="/about" className={styles.about_container}>
          <span>Sobre Nosotros</span>
        </NavLink>

        <div className={styles.searchbar_container}>
          <input
            className={styles.searchBar}
            placeholder="Buscar Bebidas..."
            type="search"
          />
          <img src={search} alt="" />
        </div>

        <NavLink to="/manage" className={styles.about_container}>
          <span>Area Privada</span>
        </NavLink>

        <div className={styles.cart_login}>
          {
            (authState.loggedIn)
              ? <><span className={styles.login} onClick={handleLogout} >Logout</span>
                <span>{getFirstName(authState)}</span>
              </>
              : <NavLink to="/login" className={styles.login}>
                <span >Login</span>
              </NavLink>
          }

          <div className={styles.cart_favorite}>
            <img src={cart} alt="" />
            <img src={favorite} alt="" />
          </div>
        </div>
      </div>
    </nav>
  ) : (
    // NAVBAR CON WIDTH MENOR A 1000
    <nav className={stylesMobile.container}>
      <div className={stylesMobile.logo_container}>
        <NavLink className={stylesMobile.logo} to="/">
          <h1>BODEGAS DEL SUR</h1>
        </NavLink>
      </div>

      <div className={stylesMobile.searchbar_container}>
        <input
          className={stylesMobile.searchBar}
          placeholder="Buscar Bebidas..."
          type="search"
        />
        <img src={search} alt="" />
      </div>

      <div className={stylesMobile.bars_cart_container}>
        <img onClick={changeBarsStatus} src={bars} alt="" />
        <img src={cart} alt="" />
      </div>
      <ul
        className={
          barsStatus === "on"
            ? stylesMobile.nav_menu_active
            : stylesMobile.nav_menu_disabled
        }
      >
        <li>INICIAR SESIÓN</li>
        <li>SOBRE NOSOTROS</li>
        <li>FAVORITOS</li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
