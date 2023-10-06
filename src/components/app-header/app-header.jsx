import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <span className={styles.logo}><Logo /></span>
        <ul className={styles.nav}>
          <a className={styles.listItem}>
            <BurgerIcon type='primary'/>
            <span className='text text_type_main-default ml-2'>Конструктор</span>
          </a>
          <a className={styles.listItem}>
            <ListIcon type='secondary' />
            <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
          </a>
          <a className={styles.listItem}>
            <ProfileIcon type='secondary' />
            <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
          </a>
        </ul>

    </header>
  );
};

export default AppHeader;