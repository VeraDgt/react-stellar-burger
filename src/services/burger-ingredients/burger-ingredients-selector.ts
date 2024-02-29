import { AppState } from "../..";

export const burgerIngredients = (store: AppState) => store.burgerIngredients
export const burgerIngredientsArr = (store: AppState) => store.burgerIngredients.items
export const burgerIngredientsRequest = (store: AppState) => store.burgerIngredients.itemsRequest