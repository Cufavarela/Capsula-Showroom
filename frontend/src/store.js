import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';


const inicialState = {};
const reducer = combineReducers({
    productList: productListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, inicialState, composeEnhancer(applyMiddleware(thunk)));

export default store;