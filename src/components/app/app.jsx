import React, { useEffect } from 'react';
import styles from "./app.module.css";
import { useDispatch } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header.jsx";
import HomePage from "../../pages/home";
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPwPage from '../../pages/forgot-password';
import ResetPwPage from '../../pages/reset-password';


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/forgot-password" element={<ForgotPwPage/>}></Route>
          <Route path="/reset-password" element={<ResetPwPage/>}></Route>
      </Routes>
    </div>
  );
}


export default App;
