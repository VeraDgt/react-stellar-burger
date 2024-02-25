import { 
  GET_ITEMS, 
  GET_ITEMS_SUCCESS, 
  INCREASE_QTY, 
  DECREASE_QTY, 
  GET_ITEMS_FAILED, 
  CLEAR_QTY,
  IngredientsActions,
  TMapItems } from "./burger-ingredients-action";
import { TIngredient } from "../../types";

export type TIngredientsState = {
  items: Array<TIngredient>,
  itemsRequest: boolean,
  itemsFailed: boolean,
  mapItems: TMapItems,
}

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  mapItems: new Map,
}

export const burgerIngredientsReducer = (state:TIngredientsState = initialState, action:IngredientsActions) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state, 
        itemsRequest: true
      }
    }

    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }

    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case INCREASE_QTY: {
      return {
        ...state,
        items: [...state.items].map((el) => {
          if(el._id === action.payload._id) {
            return el.type !== 'bun' ? { ...el, qty: ++el.qty } : { ...el, qty: 2 }
          } else {
            return el.type !== 'bun' ? el : action.payload.type === 'bun' ? { ...el, qty: 0 } : el
          }
        })
      }
    }

    case DECREASE_QTY: {
      return {
        ...state,
        items: [...state.items].map((el) => {
          if(el._id === action.payload._id) {
            return el.type !== 'bun' ? {...el, qty: --el.qty } : { ...el, qty: 0 }
          } else {
            return el.type !== 'bun' ? el : action.payload.type === 'bun' ? { ...el, qty: 2 } : el
          }
        })
      }
    }

    case CLEAR_QTY: {
      return {
        ...state,
        items: [...state.items].map((el) => {
          return { ...el, qty: 0 }
        })
      }
    }

    default: {
      return state;
    }
  }
}