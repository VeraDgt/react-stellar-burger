import React, { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(navigate('/', {replace: true}));
  }


  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <Input type='email' placeholder='E-mail' name='email' value={form.email} />
          <PasswordInput name='password' value={form.password} />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit'>Войти</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className="link" to="/register">Зарегистрироваться</Link></p>
            <p className="mt-4 text text_type_main-default text_color_inactive">Забыли пароль? <Link className="link" to="/forgot-password">Восстановить пароль</Link></p>
    </div>
  )
}
