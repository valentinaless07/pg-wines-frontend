import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,  
} from 'react-router-dom';
import { connect } from 'react-redux';
import LoginScreen from '../pages/login/LoginScreen';
import HomeScreen from '../pages/home/HomeScreen';
import ProductDetailsScreen from '../pages/productDetails/ProductDetailsScreen';
import ShippingPay from '../pages/shippingpay/ShippingPay';
import './AppRouter';
import PrivateRoute from './PrivateRoute';
import ManageProductsScreen from '../pages/manageProducts/ManageProductsScreen';


const AppRouter = ({ authState }) => {

  let loggedIn = authState.loggedIn;
  // if(!authState.loggedIn) loggedIn = false; 
 
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductDetailsScreen} />
          <Route exact path="/checkout" component={ShippingPay} /> 
          <PrivateRoute
            isAuthenticated={loggedIn}
            path='/manage'
            component={ManageProductsScreen}
          />
          <Redirect to='/home' />
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
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);



