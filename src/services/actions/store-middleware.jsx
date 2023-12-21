import { wsUrl } from "../../utils/data";
import { getCookie } from "../../utils/utils";

const storeMiddleware = (wsUrl, socketActions, setAuthChecked) => {
  return (store) => {
    let socket = null;

      return next => action => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit,
                onOpen,
                onClose,
                onError,
                wsSendMessage,
                onMessage
              } = socketActions;
        
        const token = getCookie('accessToken')?.replace('Bearer ', '');

        if (type === wsInit) {
            socket = !setAuthChecked
                    ? new WebSocket(`${wsUrl}${payload}`)
                    : new WebSocket(`${wsUrl}?token=${getCookie('accessToken')?.replace('Bearer ', '')}`)
                    }

        if (socket) {
              socket.onopen = event => {
              dispatch({ type: onOpen, payload: event });
              };
              socket.onclose = event => {
              dispatch({ type: onClose, payload: event });
              };
              socket.onerror = event => {
              dispatch({ type: onError, payload: event });
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
        } 
          next(action);
        };
    };
};

export default storeMiddleware;
