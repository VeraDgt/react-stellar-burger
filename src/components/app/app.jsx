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
import ProfilePage from '../../pages/profile';
import NoPage from '../../pages/no-page';
import ProfileData from '../profile/profile-data';


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forgot-password" element={<ForgotPwPage/>} />
        <Route path="/reset-password" element={<ResetPwPage/>} / >
        <Route path="/profile" element={<ProfilePage/>}>
          <Route index element={<ProfileData/>}/>
          <Route path="/profile/account" element={<ProfileData/>}/>
          <Route path="/profile/orders" element={<NoPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </div>
  );
}


export default App;
