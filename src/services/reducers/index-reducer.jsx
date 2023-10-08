import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { orderModalReducer, itemModalReducer } from "./modals";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  item: itemModalReducer,
  order: orderModalReducer,
});