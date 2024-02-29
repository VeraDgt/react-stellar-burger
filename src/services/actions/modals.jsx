import { getOrderNumber, getExtraOrder } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { CLEAR_CONSTRUCTOR } from "../burger-constructor/burger-constructor-action";
import { CLEAR_QTY } from "../burger-ingredients/burger-ingredients-action";
import { checkToken } from "../user-auth/auth-action";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const EXTRA_ORDER_REQUEST = 'EXTRA_ORDER_REQUEST';
export const EXTRA_ORDER_SUCCESS = 'EXTRA_ORDER_SUCCESS';
export const EXTRA_ORDER_FAILED = 'EXTRA_ORDER_FAILED';


function getOrderFailed() {
  return { type: GET_ORDER_FAILED }
}

export function getOrder(num) {
  return function(dispatch) {
    dispatch({ type: GET_ORDER });

    getOrderNumber(num).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        })
        dispatch({ type: CLEAR_CONSTRUCTOR });
        dispatch({ type: CLEAR_QTY });
      } else {
        dispatch(getOrderFailed())
      }
      if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
        dispatch(checkToken())
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(getOrderFailed())
    })
  }
};

export function getExtraOrderInfo(number) {
  return function(dispatch) {
    dispatch({
      type: EXTRA_ORDER_REQUEST
    });
    getExtraOrder(number)
    .then(res => {
      res.success ? 
      dispatch({ 
        type: EXTRA_ORDER_SUCCESS, 
        payload: res.orders[0]})
      : Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      dispatch({type: EXTRA_ORDER_FAILED, payload: err})
    });
  };
}

