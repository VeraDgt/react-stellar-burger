import React, { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/actions/auth';

export default function RegisterPage() {
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form, () => navigate('/', {replace: true})));
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <Input type='text' placeholder='Имя' name='name' value={form.name} onChange={onChange} />
          <Input type='email' placeholder='E-mail' name='email' value={form.email} onChange={onChange} />
          <PasswordInput name='password' value={form.password} onChange={onChange} />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit'>Войти</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className="link" to="/login">Войти</Link></p>
    </div>
  )
};
