import {createStore, compose, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import  rootReducer  from '../reducers';

declare global {
    interface Window {
      REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose;
    }
  }

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


export default store;