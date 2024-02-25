import { getIngredients } from '../../utils/api';
import { TIngredient } from '../../types';
import { AppThunk } from '../..';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const INCREASE_QTY = 'INCREASE_QTY';
export const DECREASE_QTY = 'DECREASE_QTY';
export const CLEAR_QTY = 'CLEAR_QTY';

export type TMapItems = Map<string, TIngredient>

type TGetItems = {
  type: typeof GET_ITEMS
}

type TGetItemsSuccess = {
  type: typeof GET_ITEMS_SUCCESS,
  items: Array<TIngredient>,
  mapItems: TMapItems,
}

type TGetItemsFailed = {
  type: typeof GET_ITEMS_FAILED
}

export type TIncreaseQty = {
  type: typeof INCREASE_QTY,
  payload: TIngredient,
}

export type TDecreaseQty = {
  type: typeof DECREASE_QTY
  payload: TIngredient,
}

export type TClearQty = {
  type: typeof CLEAR_QTY
}

export type IngredientsActions = 
| TGetItems
| TGetItemsSuccess
| TGetItemsFailed
| TIncreaseQty
| TDecreaseQty
| TClearQty

const sortItems = (items:Array<TIngredient>):Array<TIngredient> => items.sort((a:TIngredient, b:TIngredient) => a._id > b._id ? 1 : -1)

function getItemsFailed():TGetItemsFailed {
  return { type: GET_ITEMS_FAILED }
};

const mapItems = (sortedItemsArr:Array<TIngredient>) => {
  const map:TMapItems = new Map()
  sortedItemsArr.forEach((el) => {
    map.set(el._id, el);
  });
  return map
}

function getItemsRequest():TGetItems {
  return { type: GET_ITEMS}
}

export function getItemsSuccess(items:Array<TIngredient>):TGetItemsSuccess {
  return {
    type: GET_ITEMS_SUCCESS,
    items: sortItems(items),
    mapItems: mapItems(items)
  }
}

export function getItems(): AppThunk {
  return function(dispatch) {
    dispatch(getItemsRequest());

    getIngredients().then(res => {
      if (res && res.success) {
        dispatch(getItemsSuccess(res.data))
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