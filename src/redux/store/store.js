import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productRecuder';
import authReducer from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { restoreSessionAction } from '../actions/authActions';

let rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productReducer,
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

