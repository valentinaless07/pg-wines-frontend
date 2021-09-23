import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import uiReducer from '../reducers/uiReducer';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import authReducer from '../reducers/authReducer';
import offersManagerReducer from '../reducers/offersManagerReducer';
import manageProductsReducer from '../reducers/manageProductsReducer';
import thunk from 'redux-thunk';
import { restoreSessionAction } from '../actions/authActions';
import cartReducer from '../reducers/cartReducer';
import brandsAndsCategories from '../reducers/brandsAndCategories';
import orderReducer from '../reducers/orderReducer';
import usersManager from '../reducers/usersManagerReducer';
import forgotPasswordReducer from '../reducers/forgotPasswordReducer';


let rootReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  offers: offersManagerReducer,
  ui: uiReducer,
  user: userReducer,
  products: productReducer,
  manageProducts: manageProductsReducer,
  cart: cartReducer,
  brandsAndsCategories: brandsAndsCategories,
  orders: orderReducer,
  usersManager: usersManager,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  restoreSessionAction()(store.dispatch, store.getState);
  return store;
}

