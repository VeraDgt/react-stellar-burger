import React, { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPwPage() {
  const [ form, setForm ] = useState({
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(navigate('/login', {replace: true}));
  }

  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <PasswordInput name='password' value={form.password} placeholder='Введите новый пароль'/>
          <Input type='text' placeholder='Введите код из письма' name='token' value={form.token} />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit'>Сохранить</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="link" to="/login">Войти</Link></p>
    </div>
  )
};
