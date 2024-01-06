import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { orderModalReducer } from "./modals-reducer";
import { userAuthReducer } from "./auth-reducer";
import { wsReducer } from "./socket-reducer";
import { socketAuthReducer } from "./socket-auth-reducer";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderModalReducer,
  user: userAuthReducer,
  ordersList: wsReducer,
  ordersHistory: socketAuthReducer,
});