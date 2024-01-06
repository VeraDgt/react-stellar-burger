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
import ProfileData from '../profile-data/profile-data';
import IngredientInfoPage from '../../pages/ingredient-info';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import FeedPage from '../../pages/feed';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getItems()) }, [dispatch]);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);
  
  const closeModal = () => {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route index element={<HomePage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/feed" element={<FeedPage/>} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
        <Route path="/forgot-password"  element={<OnlyUnAuth component={<ForgotPwPage/>} />} />
        <Route path="/reset-password"  element={<ResetPwPage/>} />
        <Route path="/ingredients/:id" element={<IngredientInfoPage/>} />
        <Route path="/profile"element={<OnlyAuth component={<ProfilePage/>} />} >
          <Route index element={<ProfileData/>}/>
          <Route path="/profile/account" element={<ProfileData/>}/>
          <Route path="/profile/orders" element={<NoPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
        <Route path="*" element={<NoPage/>} />
      </Routes>
      {background && (
        <Routes>
          <Route 
            path="/ingredients/:id"
            element={
              <Modal header="Детали ингредиента" handleClose={closeModal} hasOverlay={true}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};


export default App;
