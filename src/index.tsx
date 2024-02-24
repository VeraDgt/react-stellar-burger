import React from "react";
import "./index.css";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services/actions/store";
import { rootReducer } from "./services/reducers/index-reducer";

export type AppState = ReturnType<typeof rootReducer>;

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