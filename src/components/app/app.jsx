import React, { useEffect } from 'react';
import styles from "./app.module.css";
import { useDispatch } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
        <Main />
    </div>
  );
}


export default App;
