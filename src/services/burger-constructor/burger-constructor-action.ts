import { TIngredient } from "../../types";

export const GET_BURGER_DATA = 'GET_BURGER_DATA';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DRAG_ITEM = 'DRAG_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export type TGetBurgerData = {
  type: typeof GET_BURGER_DATA,
  payload: TIngredient,
  key: number
}

type TDeteleItem = {
  type: typeof DELETE_ITEM,
  payload: TIngredient,
}

type TDragItem = {
  type: typeof DRAG_ITEM,
  dragIndex: number,
  hoverIndex: number,
}

type TClearConstructor = {
  type: typeof CLEAR_CONSTRUCTOR,
}

export type ConstructorActions = 
| TGetBurgerData
| TDeteleItem
| TDragItem
| TClearConstructor