import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productRecuder";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const generateStore = () => {
//     let store = createStore(
//         rootReducer,
//         composeEnhancers(applyMiddleware(thunk)),
//     );
// }

const generateStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default generateStore;
