import { AppState } from "../..";

export const ordersList = (store: AppState) => store.ordersList.orders
export const ordersListArr = (store: AppState) => store.ordersList.orders?.orders
export const ordersListQty = (store: AppState) => store.ordersList.orders?.total
export const ordersListTodayQty = (store: AppState) => store.ordersList.orders?.totalToday
