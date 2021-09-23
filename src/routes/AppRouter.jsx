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
import GestionDeOrdenes from '../pages/MisOrdenes/GestionDeOrdenes';
import GestionDetalleDeOrdenes from '../pages/MisOrdenes/GestionDetalleDeOrdenes';
import AdminArea from '../pages/adminArea/AdminArea';
import OurTeam from '../pages/ourteam/OurTeam';
// import UsersManager from '../pages/usersManager/UsersManager';
import UsersManager from '../components/usersManager/UsersManager';
import { cartStateLogin, getTotalPrice } from '../redux/actions/cartActions';
import Brands from '../components/brands/Brands';
import OrderFeedback from '../pages/OrderFeedback/OrderFeedback';
import { getUserFavorites } from '../redux/actions/manageProductsActions';
import ForgotPasswordScreen from '../pages/forgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from '../pages/resetPassword/ResetPasswordScreen';
import Packing from '../pages/Packing/Packing';
import PayConfirmation from '../pages/PayConfirmation/PayConfirmation';

const AppRouter = ({ authState, cartStateLogin, getTotalPrice, getUserFavorites }) => {

  let { loggedIn, admin, active } = authState;

  if (loggedIn) {
    localStorage.removeItem("cart")
    cartStateLogin(authState.uid)
    .then(() => getTotalPrice())
    getUserFavorites(authState.uid)

  }
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/reset-password/:userId/:token" component={ResetPasswordScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/product/:id" component={ProductDetailsScreen} />
          <Route exact path="/vino/:name" component={SearchResults} />
          <Route exact path="/about" component={AboutUs} />
          {/* <Route exact path='/manage' component={ManageProductInf} /> */}
          <Route exact path="/checkout" component={ShippingPay} />
          {/* <Route exact path="/offersManager" component={OffersManager} /> */}
          <Route exact path="/misordenes" component={MisOrdenes} />
          <Route exact path="/order/:id" component={DetalleOrden} />
          <Route exact path="/equipo" component={OurTeam} />
          <Route exact path= "/feedback" component={OrderFeedback} />

          <Route exact path="/cart" component={Cart} />
          <Route exact path="/payconfirmation" component={PayConfirmation} />
          {/* <Route exact path="/notFound" component={NotFound} /> */}
             
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/categories'
            component={Brands}
          />
           <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/gestionordenes'
            component={GestionDeOrdenes}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/gestionorder/:id'
            component={GestionDetalleDeOrdenes}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/offersManager'
            component={OffersManager}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/usersManager'
            component={UsersManager}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/manageProducts'
            component={ManageProductsScreen}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/adminArea'
            component={AdminArea}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/createproduct'
            component={CreateProduct}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/checkout'
            component={ShippingPay}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={true}
            isActive={active}
            path='/favorites'
            component={Favorites}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/update/:id'
            component={PutProduct}
          />
          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            isAdmin={admin}
            isActive={active}
            path='/packing'
            component={Packing}
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
    cartStateLogin: (id) => dispatch(cartStateLogin(id)),
    getTotalPrice: () => dispatch(getTotalPrice()),
    getUserFavorites: (id) => dispatch(getUserFavorites(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
