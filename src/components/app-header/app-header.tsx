import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

const AppHeader = () => {
  const location = useLocation();
  const iconType = (url: string) => location.pathname === url ? 'primary' : 'secondary';
  const textStyle = (url: string) => location.pathname === url ? 'text text_type_main-default text_color_primary ml-2' : 'text text_type_main-default text_color_inactive ml-2';

  return (
    <header className={styles.header}>
      <span className={styles.logo}><NavLink to="/"><Logo /></NavLink></span>
        <ul className={styles.nav}>
          <NavLink to="/" className={isActive => `${styles.listItem} text_color_${isActive ? 'primary' : 'inactive'}`}>
            <BurgerIcon type={iconType('/')}/>
            <span className={textStyle('/')}>Конструктор</span>
          </NavLink>
          <NavLink to="/feed" className={isActive => `${styles.listItem} text_color_${isActive ? 'primary' : 'inactive'}`}>
            <ListIcon type={iconType('/feed')} />
            <span className={textStyle('/feed')}>Лента заказов</span>
          </NavLink>
          <NavLink to="/profile" className={isActive => `${styles.listItem} text_color_${isActive ? 'primary' : 'inactive'}`}>
            <ProfileIcon type={iconType('/profile')} />
            <span className={textStyle('/profile')}>Личный кабинет</span>
          </NavLink>
        </ul>

    </header>
  );
};

export default AppHeader;