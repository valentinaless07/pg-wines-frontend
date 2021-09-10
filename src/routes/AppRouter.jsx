import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
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
import SliderManager from '../pages/sliderManager/SliderManager';

const AppRouter = ({ authState }) => {

  let loggedIn = authState.loggedIn;

  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductDetailsScreen} />
          <Route exact path="/vino/:name" component={SearchResults} />
          <Route exact path="/about" component={AboutUs} />
          <Route  path="/register" component={RegisterScreen} />
          {/* <Route exact path="/checkout" component={ShippingPay} />  */}
          <Route exact path="/cart" component={Cart}/>
          {/* <Route exact path="/sliderManager" component={SliderManager} /> */}

          <PrivateRoute
            exact
            isAuthenticated={loggedIn}
            path='/sliderManager'
            component={SliderManager}
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
            path='/manageProducts'
            component={ManageProductsScreen}
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
            
          {/* <Redirect to='/home' />       */}
          <Redirect to='/sliderManager' />      

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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);



