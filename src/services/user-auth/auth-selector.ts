import { AppState } from "../..";

export const currUser = (store: AppState) => store.user
export const authChecked = (store: AppState) => store.user.isAuthChecked