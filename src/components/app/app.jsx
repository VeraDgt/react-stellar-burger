import React, { useEffect } from 'react';
import styles from "./app.module.css";
import { useDispatch } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header.jsx";
import HomePage from "../../pages/home";
import { Routes, Route } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
      </Routes>
    </div>
  );
}


export default App;
