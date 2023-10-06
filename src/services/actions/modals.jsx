import { getOrderNumber } from "../../utils/api";
import { CLEAR_CONSTRUCTOR } from "./burger-constructor";
import { CLEAR_QTY } from "./burger-ingredients";

export const ADD_ITEM_DATA = 'ADD_ITEM_DATA';
export const DELETE_ITEM_DATA = 'DELETE_ITEM_DATA';
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

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
    })
    .catch(err => {
      console.log(err);
      dispatch(getOrderFailed())
    })
  }
}