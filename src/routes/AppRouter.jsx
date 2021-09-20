import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,  
} from 'react-router-dom';
import { connect } from 'react-redux';
import HomeScreen from '../pages/home/HomeScreen';
import ProductDetailsScreen from '../pages/productDetails/ProductDetailsScreen';
import ShippingPay from '../pages/shippingpay/ShippingPay';
import './AppRouter';
import PrivateRoute from './PrivateRoute';
import ManageProductsScreen from '../pages/manageProducts/ManageProductsScreen';
import CreateProduct from '../pages/CreateProduct/CreateProduct';
import Favorites from '../pages/favorites/Favorites.jsx';
import AboutUs from '../pages/aboutUs/AboutUs';
import Cart from '../pages/cart/Cart';
import RegisterScreen from '../pages/register/RegisterScreen';
import LoginScreen from '../pages/login/LoginScreen';
import PutProduct from '../pages/PutProduct/PutProduct';
import SearchResults from '../pages/productDetails/SearchResults';
import OffersManager from '../pages/offersManager/OffersManager';
import NotFound from '../pages/NotFound/NotFound';
import DetalleOrden from '../pages/MisOrdenes/DetalleOrden';
import MisOrdenes from '../pages/MisOrdenes/MisOrdenes';
import AdminArea from '../pages/adminArea/AdminArea';
import OurTeam from '../pages/ourteam/OurTeam';
import { cartStateLogin } from '../redux/actions/cartActions';
import Brands from '../components/brands/Brands';

const AppRouter = ({ authState, cartStateLogin }) => {

  let loggedIn = authState.loggedIn;
  if(loggedIn){
    localStorage.removeItem("cart")
    cartStateLogin(authState.uid)
  }
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductDetailsScreen} />
          <Route exact path="/vino/:name" component={SearchResults} />
          <Route exact path="/about" component={AboutUs} />
          {/* <Route exact path='/manage' component={ManageProductInf} /> */}
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/checkout" component={ShippingPay} />
          {/* <Route exact path="/offersManager" component={OffersManager} /> */}
          <Route exact path="/misordenes" component={MisOrdenes} />
          <Route exact path="/order/:id" component={DetalleOrden} />
          <Route exact path="/equipo" component={OurTeam} />

          <Route exact path="/cart" component={Cart} />
          {/* <Route exact path="/notFound" component={NotFound} /> */}
         
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/brands'
            component={Brands}
          />

          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/categories'
            component={Brands}
          />

          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/offersManager'
            component={OffersManager}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/manageProducts'
            component={ManageProductsScreen}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/adminArea'
            component={AdminArea}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/createproduct'
            component={CreateProduct}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/checkout'
            component={ShippingPay}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/favorites'
            component={Favorites}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/update/:id'
            component={PutProduct}
          />

          <Route component={NotFound} />

        </Switch>

      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    cartStateLogin: (id) => dispatch(cartStateLogin(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
