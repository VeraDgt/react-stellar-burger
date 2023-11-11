import React, { useEffect } from 'react';
import styles from "./app.module.css";
import { useDispatch } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header.jsx";
import HomePage from "../../pages/home";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from '../../services/actions/auth';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPwPage from '../../pages/forgot-password';
import ResetPwPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import NoPage from '../../pages/no-page';
import ProfileData from '../profile/profile-data';
import IngredientInfoPage from '../../pages/ingredient-info';



function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
        <Route path="/forgot-password"  element={<OnlyUnAuth component={<ForgotPwPage/>} />} />
        <Route path="/reset-password"  element={<OnlyUnAuth component={<ResetPwPage/>} />} />
        <Route path="/ingredients/:id" element={IngredientInfoPage} />
        <Route path="/profile"element={<OnlyAuth component={<ProfilePage/>} />} >
          <Route index element={<ProfileData/>}/>
          <Route path="/profile/account" element={<ProfileData/>}/>
          <Route path="/profile/orders" element={<NoPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </div>
  );
};


export default App;
