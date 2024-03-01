import { rootReducer } from "./reducers/index-reducer";
import storeMiddleware  from './actions/store-middleware';
import { wsUrl } from '../utils/data';
import { socketActions } from './actions/socket';
import { socketAuth } from './actions/socket-auth';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer, 
  middleware: [thunk, storeMiddleware(wsUrl, socketActions, false),storeMiddleware(wsUrl, socketAuth, true)],
});


