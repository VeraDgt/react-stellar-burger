import { wsUrl } from "../../utils/data";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_DISCONNECT = 'WS_DISCONNECT';


export const socketActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
  wsDisconnect: WS_DISCONNECT,
}

export function disconnect() {
  return function (dispatch) {
    dispatch({
      type: WS_DISCONNECT,
    })
  }
}