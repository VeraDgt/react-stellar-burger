import React, { useEffect } from 'react';
import styles from "./app.module.css";
import { useDispatch } from 'react-redux';
import { getItems } from "../../services/actions/burger-ingredients";
import AppHeader from "../app-header/app-header.jsx";
import HomePage from "../../pages/home/home";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from '../../services/actions/auth';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPwPage from '../../pages/forgot-password/forgot-password';
import ResetPwPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import NoPage from '../../pages/no-page/no-page';
import ProfileData from '../profile-data/profile-data';
import IngredientInfoPage from '../../pages/ingredient-info/ingredient-info';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import FeedPage from '../../pages/feed/feed';
import OrderPage from '../../pages/order/order';
import FeedOrder from '../feed-order-info/feed-order-info';
import ProfileOrders from '../profile-orders/profile-orders';

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
        <Route path="/feed/:number" element={<OrderPage/>} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
        <Route path="/forgot-password"  element={<OnlyUnAuth component={<ForgotPwPage/>} />} />
        <Route path="/reset-password"  element={<ResetPwPage/>} />
        <Route path="/ingredients/:id" element={<IngredientInfoPage/>} />
        <Route path="/profile"element={<OnlyAuth component={<ProfilePage/>} />} >
          <Route index element={<ProfileData/>}/>
          <Route path="/profile/account" element={<ProfileData/>}/>
          <Route path="/profile/orders" element={<ProfileOrders/>}/>
          <Route path="/profile/orders/:number" element={<OrderPage/>} />
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
          <Route 
            path="/feed/:number"
            element={
              <Modal handleClose={closeModal} hasOverlay={true}>
                <FeedOrder />
              </Modal>
            }
          />
          <Route 
            path="/profile/orders/:number"
            element={<OnlyAuth component={
              <Modal handleClose={closeModal} hasOverlay={true}>
                <FeedOrder />
              </Modal>
            } />}
          />
        </Routes>
      )}
    </div>
  );
};


export default App;
