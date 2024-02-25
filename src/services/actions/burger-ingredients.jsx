import { getIngredients } from '../../utils/api';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const INCREASE_QTY = 'INCREASE_QTY';
export const DECREASE_QTY = 'DECREASE_QTY';
export const CLEAR_QTY = 'CLEAR_QTY';

function getItemsFailed() {
  return { type: GET_ITEMS_FAILED }
};

export function getItems() {
  return function(dispatch) {
    dispatch({type: GET_ITEMS});

    getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data.map((el) => { return { ...el, qty: 0}})
        })
      } else {
        dispatch(getItemsFailed())
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(getItemsFailed())
    })
  }
}