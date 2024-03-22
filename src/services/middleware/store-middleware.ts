import { getCookie } from "../../utils/utils";
import { Middleware } from "redux";
import { AppState } from "../..";

export type TsoketActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  wsSendMessage?: string;
  wsDisconnect: string;
  onMessage: string;
}

const storeMiddleware = (
  wsUrl: string, 
  socketActions: TsoketActions, 
  setAuthChecked: boolean): Middleware<{}, AppState> => {
  return (store) => {
    let socket: WebSocket | null  = null;
    let disconnect = false;

      return next => action => { 
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit,
                onOpen,
                onClose,
                onError,
                wsSendMessage,
                wsDisconnect,
                onMessage
              } = socketActions;
        
        const token = getCookie('accessToken')?.replace('Bearer ', '');

        if (type === wsInit && !socket) {
            socket = !setAuthChecked
                    ? new WebSocket(`${wsUrl}${payload}`)
                    : new WebSocket(`${wsUrl}?token=${getCookie('accessToken')?.replace('Bearer ', '')}`)
                    }

        if (socket && !disconnect) {
              socket.onopen = event => {
              dispatch({ type: onOpen, payload: event });
              };
              socket.onclose = event => {
              dispatch({ type: onClose, payload: event });
              };
              socket.onerror = event => {
              dispatch({ type: onError, payload: "Ошибка подключения к серверу" });
              };
              socket.onmessage = event => {
                const { data } = event;
                const { success, ...info } = JSON.parse(data);
                dispatch({ type: onMessage, payload: info });
              };
              if (type === wsSendMessage) {
                const message = payload;
                socket.send(JSON.stringify(message));
            }
            if (type === wsDisconnect) {
              disconnect = true;
              socket.close();
              socket = null;
            }
        } 
          next(action);
        };
    };
};

export default storeMiddleware;
