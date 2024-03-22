import { rootReducer } from "./index-reducer";
import storeMiddleware  from './middleware/store-middleware';
import { wsUrl } from '../utils/data';
import { socketActions } from './socket/socket-action';
import { socketAuth } from './socket-auth/socket-auth-action';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: rootReducer, 
  middleware: [thunk, storeMiddleware(wsUrl, socketActions, false),storeMiddleware(wsUrl, socketAuth, true)],
});


