import { AppDispatch } from "../..";
import { TOrdersArr } from "../../types";

export const WS_AUTH_START = 'WS_AUTH_START';
export const WS_AUTH_SUCCESS = 'WS_AUTH_SUCCESS';
export const WS_AUTH_ERROR = 'WS_AUTH_ERROR';
export const WS_AUTH_CLOSED = 'WS_AUTH_CLOSED';
export const WS_AUTH_ORDERS = 'WS_AUTH_ORDERS';
export const WS_AUTH_MESSAGE = 'WS_AUTH_MESSAGE';
export const WS_AUTH_DISCONNECT = 'WS_AUTH_DISCONNECT';

type TWsAuthStart = {
  type: typeof WS_AUTH_START,
}

type TWsAuthSuccess = {
  type: typeof WS_AUTH_SUCCESS,
}

type TWsAuthError = {
  type: typeof WS_AUTH_ERROR,
  payload: string,
}

type TWsAuthClosed = {
  type: typeof WS_AUTH_CLOSED,
}

type TWsAuthOrders = {
  type: typeof WS_AUTH_ORDERS,
  payload: TOrdersArr,
}

type TWsAuthMessage = {
  type: typeof WS_AUTH_MESSAGE,
}

type TWsAuthDisconnect = {
  type: typeof WS_AUTH_DISCONNECT,
}

export type OrdersActions = 
| TWsAuthStart
| TWsAuthSuccess
| TWsAuthError
| TWsAuthClosed
| TWsAuthOrders
| TWsAuthMessage
| TWsAuthDisconnect;

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
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_AUTH_DISCONNECT,
    })
  }
}