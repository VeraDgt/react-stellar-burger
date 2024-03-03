import { AppState } from "../..";

export const orderNum = (store: AppState) => store.order.order.number
export const orderExtra = (store: AppState) => store.order?.order.extraOrder
export const orderRequest = (store: AppState) => store.order.orderRequest
export const orderIngredientsArr = (store: AppState) => store.order.order.ingredients