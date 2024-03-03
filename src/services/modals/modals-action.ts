import { AppDispatch, AppThunk } from "../..";
import { TOrder } from "../../types";
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

type TGetOrder = {
  type: typeof GET_ORDER
}

type TGetOrderSuccess = {
  type: typeof GET_ORDER_SUCCESS,
  order?: string,
}

type TGetOrderFailed = {
  type: typeof GET_ORDER_FAILED
}

type TGetExtraOrder = {
  type: typeof EXTRA_ORDER_REQUEST
}

type TExtraOrderSuccess = {
  type: typeof EXTRA_ORDER_SUCCESS,
  payload: TOrder,
}

type TExtraOrderFailed = {
  type: typeof EXTRA_ORDER_FAILED
}

export type OrderActions = 
| TGetOrder
| TGetOrderSuccess
| TGetOrderFailed
| TGetExtraOrder
| TExtraOrderSuccess
| TExtraOrderFailed;

function getOrderFailed(): TGetOrderFailed {
  return { type: GET_ORDER_FAILED }
}

const getOrderSuccess = (payload: string | undefined): TGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  order: payload,
})

export function getOrder(num: Array<string>) {
  return function(dispatch: AppDispatch & AppThunk) {
    dispatch({ type: GET_ORDER });

    getOrderNumber(num).then(res => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order));
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

const getExtraOrderSuccess = (payload: TOrder): TExtraOrderSuccess => ({
  type: EXTRA_ORDER_SUCCESS,
  payload,
})

export function getExtraOrderInfo(number: string | undefined) {
  return function(dispatch: AppDispatch & AppThunk) {
    dispatch({
      type: EXTRA_ORDER_REQUEST
    });
    getExtraOrder(number)
    .then(res => {
      res.success ? 
      dispatch(getExtraOrderSuccess(res.orders[0]))
      : Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      dispatch({type: EXTRA_ORDER_FAILED, payload: err})
    });
  };
}

