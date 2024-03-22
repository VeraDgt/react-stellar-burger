import { AppState } from "../..";

export const currUser = (store: AppState) => store.user.user
export const currUserName = (store: AppState) => store.user.user?.name
export const currUserEmail = (store: AppState) => store.user.user?.email
export const currUserPassword = (store: AppState) => store.user.user?.password
export const authChecked = (store: AppState) => store.user.isAuthChecked