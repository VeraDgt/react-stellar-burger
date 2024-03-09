import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/login.module.css';
import { useAppDispatch } from '../..';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { regexPassword, regexToken } from '../../utils/data';
import { resetPassword } from '../../services/user-auth/auth-action';

export default function ResetPwPage() {
  const [ form, setForm ] = useState({
    password: '',
    token: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(form));
    navigate('/login', {replace: true});
  }

  const onChange = (e: FormEvent) => {
    setForm({
      ...form,
      [(e.target as HTMLInputElement)?.name]: (e.target as HTMLInputElement)?.value
    });
  }

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexPassword.test(form.password));
    setValidForm(regexToken.test(form.token));
  }, [form.password, form.token])

  return fromPage === '/forgot-password' ? (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <PasswordInput 
          name='password' 
          value={form.password} 
          placeholder='Введите новый пароль' 
          onChange={onChange} 
          aria-invalid={validForm ? "false" : "true"}/>
          <Input 
          type='text' 
          placeholder='Введите код из письма' 
          name='token' 
          value={form.token} 
          onChange={onChange} 
          aria-invalid={validForm ? "false" : "true"}/>
        </fieldset>
        <Button type='primary' size='large' htmlType='submit' disabled={!validForm}>Сохранить</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="link" to="/login">Войти</Link></p>
    </div>
  ) 
  : (<Navigate to={"/login"} replace />)
};
