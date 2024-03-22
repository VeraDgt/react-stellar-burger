import { AppState } from "../..";

export const orderInfo = (store: AppState) => store.order.order
export const orderDate = (store: AppState) => store.order.order?.createdAt
export const orderNum = (store: AppState) => store.order.order?.number
export const orderRequest = (store: AppState) => store.order.orderRequest
export const orderIngredientsArr = (store: AppState) => store.order.order?.ingredients

export const orderExtra = (store: AppState) => store.order.extraOrder
