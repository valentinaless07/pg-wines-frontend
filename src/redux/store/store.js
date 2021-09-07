import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import authReducer from '../reducers/authReducer';
import manageProductsReducer from '../reducers/manageProductsReducer';
import thunk from 'redux-thunk';
import { restoreSessionAction } from '../actions/authActions';
import cartReducer from '../reducers/cartReducer';

let rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productReducer,
  manageProducts: manageProductsReducer,
  cart: cartReducer
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

