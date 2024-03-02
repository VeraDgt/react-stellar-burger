import { 
  WS_AUTH_SUCCESS,
  WS_AUTH_CLOSED,
  WS_AUTH_ERROR,
  WS_AUTH_ORDERS,
  WS_AUTH_DISCONNECT,
  OrdersActions } from "./socket-auth-action";

  const initialState = {
    connected: false,
    orders: null,
    error: undefined
  };

  export const socketAuthReducer = (state = initialState, action: OrdersActions) => {
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
        case WS_AUTH_DISCONNECT: {
          return {
            ...state,
            error: undefined,
            connected: false
          }
        };
      default: return state;
    }
  };
