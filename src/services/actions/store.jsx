import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from "../reducers/index-reducer";
import thunkMiddleware from 'redux-thunk';
import storeMiddleware  from './store-middleware';
import { wsUrl } from '../../utils/data';
import { socketActions } from './socket';
import { socketAuth } from './socket-auth';


const composeEnhancers = 
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  storeMiddleware(wsUrl, socketActions, false),
  storeMiddleware(wsUrl, socketAuth, true)
  ));

export const store = createStore(rootReducer, enhancer);

