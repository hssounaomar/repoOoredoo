import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import promise from "redux-promise";

/* const createStoreWithMiddleware = (createStore);*/
const store= createStore(rootReducer,
    applyMiddleware(promise,thunk) 
);
export default store;