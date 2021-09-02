import { createStore, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';


// let rootReducer = combineReducers({
//     user: userReducer,
// });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const generateStore = () => {
//     let store = createStore(
//         rootReducer,
//         composeEnhancers(applyMiddleware(thunk)),
//     );
// }

const generateStore = createStore(userReducer, composeEnhancers(applyMiddleware(thunk)));

export default generateStore;
