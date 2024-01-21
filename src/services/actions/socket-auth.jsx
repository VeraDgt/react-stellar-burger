export const WS_AUTH_START = 'WS_AUTH_START';
export const WS_AUTH_SUCCESS = 'WS_AUTH_SUCCESS';
export const WS_AUTH_ERROR = 'WS_AUTH_ERROR';
export const WS_AUTH_CLOSED = 'WS_AUTH_CLOSED';
export const WS_AUTH_ORDERS = 'WS_AUTH_ORDERS';
export const WS_AUTH_MESSAGE = 'WS_AUTH_MESSAGE';
export const WS_AUTH_DISCONNECT = 'WS_AUTH_DISCONNECT';

export const socketAuth = {
  wsInit: WS_AUTH_START,
  onOpen: WS_AUTH_SUCCESS,
  onError: WS_AUTH_ERROR,
  onClose: WS_AUTH_CLOSED,
  onMessage: WS_AUTH_ORDERS,
  wsSendMessage: WS_AUTH_MESSAGE,
  wsDisconnect: WS_AUTH_DISCONNECT,
}

export function authDisconnect() {
  return function (dispatch) {
    dispatch({
      type: WS_AUTH_DISCONNECT,
    })
  }
}