import React, { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import stylesMobile from "./NavbarMobile.module.css";
import cart from "./cart-icon.svg";
import search from "./search.svg";
import { logOutAction } from '../../redux/actions/authActions';
import favorite from "./favorite-icon.svg";
import bars from "./bars.svg";
import { getProductByName } from "../../redux/actions/products";
import { useDispatch } from "react-redux";

const Navbar = ({ authState, logOutAction, cartState }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const vinos = useSelector((state) => state.products.product_search);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", changeScreen);
    return () => {
      window.removeEventListener("resize", changeScreen);
    }
  }, []);

  // window.addEventListener("resize", changeScreen);

  const handleLogout = () => {
    history.push('/home');
    logOutAction();
  }

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [barsStatus, setBarsStatus] = useState("off");


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

  function goTo(route) {
    history.push(`/${route}`);
  }

  function getAvatar() {
    if (authState.loggedIn) {
      return (<div className="tooltip bottom">
         <span class="tiptext">{authState.displayName}</span>
        <div style={{ fontSize: '2em', color: 'green' }}><i class="far fa-user-circle" with="100px"></i></div>
      </div>);
    }
    return;
  }

  const handleChange = (e) => {
    setName(e.target.value);
    if (name.length > 2) {
      buscarVinos(name)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting');
    if (name) {
      history.push(`/vino/${name}`);
      setName({})
    }
  };

  const buscarVinos = (e) => {
    dispatch(getProductByName(name));
    console.log('Vinos', vinos)
  }

  function handleGoToProducDescription(productId) {
    history.push(`/product/${productId}`);
}
  function totalItems () {
    let total = 0
    cartState.forEach(el => total += el.itemsAmount)
    if(total > 99){return "99"}
    return total
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

        <form className={styles.searchbar_container} onSubmit={handleSubmit}>
          <input
            className={styles.searchBar}
            placeholder="Buscar Bebidas..."
            type="search"
            onChange={handleChange}
          />
         
          <button type="submit">
            <img src={search} alt="" />
          </button>

        </form>
        {(vinos.length > 0 && name && name.length > 2) ?
        <div className={styles.autoContainer}>
         {vinos.map(item => {
           return (
             <button className="item-autocomplete" key={item.id} onClick={() => handleGoToProducDescription(item.id)} >{item.name}</button>
           )
         })}
        </div>
        : ''}

        {/* <NavLink to="/manageProducts" className={styles.about_container}>
                  <span>Area Reservada</span>
                </NavLink> */}

        <div className={styles.cart_login}>
          {
            (authState.loggedIn)
              ? <>
                <span className={styles.login} onClick={() => goTo('manageProducts')} >Area Reservada</span>
                <span className={styles.login} onClick={handleLogout} >Salir</span>
                {getAvatar()}
              </>
              : <NavLink to="/login" className={styles.login}>
                <span >Iniciá Sesión</span>
              </NavLink>
          }

          <div className={styles.cart_favorite}>
          <img src={favorite} alt="" onClick={() => goTo('favorites')} />
            <div className={styles.cart_container}>
            <img src={cart} alt="" onClick={() => goTo('cart')} />
            {totalItems() > 0 ?
             <span>{totalItems()}</span>
            :<div></div>
            }
            </div>

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
        {getAvatar()}
        <img onClick={changeBarsStatus} src={bars} alt="" />
        {/* <img src={cart} alt="" /> */}
      </div>
      <ul
        className={
          barsStatus === "on"
            ? stylesMobile.nav_menu_active
            : stylesMobile.nav_menu_disabled
        }
      >

        {
          (authState.loggedIn)
            ?
            <>
              <li onClick={() => goTo('about')}>SOBRE NOSOTROS</li>
              <li onClick={() => goTo('manageProducts')}>AREA RESERVADA</li>
              <li onClick={() => goTo('favorites')}>FAVORITOS</li>
              <li onClick={() => goTo('cart')}>CARRITO</li>
              <li onClick={handleLogout}>SALIR</li>
            </>
            :
            <>
              <li onClick={() => goTo('login2')}>INICIÁ SESIÓN</li>
              <li onClick={() => goTo('about')}>SOBRE NOSOTROS</li>
            </>
        }

      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
    cartState: state.cart.cartState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);