import { Link } from 'react-router-dom';
import styles from './login.module.css';

const NoPage = () => {
  return (
    <div className={styles.page}>
    <h1 className='text text_type_digits-large mb-6 text_color_inactive'>Ошибка 404</h1>
    <p className="text text_type_main-default mb-8 text_color_inactive">Такой страницы нет</p>
    <p className="text text_type_main-default mb-8 text_color_inactive">но вы всегда можете <Link className={styles.link} to="/">вернуться на главную страницу</Link></p>
    </div>
  )
}

export default NoPage;