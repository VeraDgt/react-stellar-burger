import { AppState } from "../..";

export const burgerIngredients = (store: AppState) => store.burgerIngredients
export const burgerIngredientsArr = (store: AppState) => store.burgerIngredients.items
export const burgerIngredientsMap = (store: AppState) => store.burgerIngredients.mapItems