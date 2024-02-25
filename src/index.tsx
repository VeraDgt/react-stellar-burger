import React from "react";
import "./index.css";
import { Provider, useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import ReactDOM from "react-dom";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services/actions/store";
import { rootReducer } from "./services/reducers/index-reducer";
import type {} from "redux-thunk/extend-redux";
import { ThunkAction } from "redux-thunk";
import { TUserActions } from "./services/actions/auth";

export type AppState = ReturnType<typeof rootReducer>;

// type AppActions =
  // | ConstructorActions
//   | FeedActions
  // | IngredientsActions
//   | OrdersActions
//   | OrderActions
  // | TUserActions;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   AppActions
// >;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();