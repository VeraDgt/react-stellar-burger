import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor/burger-constructor-reducer";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients-reducer";
import { orderModalReducer } from "./modals/modals-reducer";
import { userAuthReducer } from "./user-auth/auth-reducer";
import { wsReducer } from "./socket/socket-reducer";
import { socketAuthReducer } from "./socket-auth/socket-auth-reducer";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderModalReducer,
  user: userAuthReducer,
  ordersList: wsReducer,
  ordersHistory: socketAuthReducer,
});