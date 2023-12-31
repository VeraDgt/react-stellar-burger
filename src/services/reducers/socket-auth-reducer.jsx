import { 
  WS_AUTH_SUCCESS,
  WS_AUTH_CLOSED,
  WS_AUTH_ERROR,
  WS_AUTH_ORDERS } from "../actions/socket-auth";

  const initialState = {
    connected: false,
    orders: null,
    error: undefined
  };

  export const socketAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_AUTH_SUCCESS:
        return {
          ...state,
          error: undefined,
          connected: true
        };
      case WS_AUTH_CLOSED:
        return {
          ...state,
          error: undefined,
          connected: false
        };
      case WS_AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
          connected: false
        };
      case WS_AUTH_ORDERS:
        return {
          ...state,
          error: undefined,
          orders: {...action.payload, orders: action.payload.orders?.reverse()}
        };
      default: return state;
    }
  };
