import React, { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { recoverPassword } from '../services/actions/auth';

export default function ForgotPwPage() {
  const [ form, setForm ] = useState({
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(recoverPassword(form, () => navigate('/reset-password', {replace: true})));
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <Input type='email' placeholder='E-mail' name='email' value={form.email} onChange={onChange} />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit'>Восстановить</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
    </div>
  )
}