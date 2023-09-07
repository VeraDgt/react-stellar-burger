import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <span className={styles.logo}><Logo /></span>
        <ul className={`${styles.nav} default-list`}>
          <li className={`${styles.listItem} mr-7 ml-5`}>
            <BurgerIcon type='primary'/>
            <a className='text text_type_main-default ml-2'>Конструктор</a>
          </li>
          <li className={`${styles.listItem} mr-7 ml-5`}>
            <ListIcon type='secondary' />
            <a className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</a>
          </li>
          <li className={`${styles.listItem} mr-7 ml-5`}>
            <ProfileIcon type='secondary' />
            <a className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</a>
          </li>
        </ul>

    </header>
  );
};

export default AppHeader;