import { AppState } from "../..";

export const ordersHistory = (store: AppState) => store.ordersHistory.orders
export const ordersHistoryArr = (store: AppState) => store.ordersHistory.orders?.orders