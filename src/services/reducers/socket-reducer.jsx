import { 
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS } from "../actions/socket";

  const initialState = {
    connected: false,
    orders: null,
    error: undefined
  };

  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          connected: true
        };

      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          connected: false
        };

      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          connected: false
        };

      case WS_GET_ORDERS:
        return {
          ...state,
          error: undefined,
          orders: action.payload
        };

      default: return state;
    }
  };
