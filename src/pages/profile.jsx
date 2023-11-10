import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { logout } from "../services/actions/auth";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(navigate('/login', {replace: true}));
  }
  
  return (
    <div className={styles.page}>
      <ul className={styles.list}>
        <li>
          <NavLink to="/profile/account" className={styles.link}>Профиль
          </NavLink>
        </li>
        <li>
        <NavLink to="profile/orders" className={styles.link}>История заказов
          </NavLink>
        </li>
        <li>
        <button onClick={handleClick} className={styles.button}>Выход
          </button>
        </li>
        <p className={styles.paragraph}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>
      
      <Outlet />
    </div>
  )
}