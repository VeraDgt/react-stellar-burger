import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/login.module.css';
import { useAppDispatch } from '../..';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { recoverPassword } from '../../services/user-auth/auth-action';
import { regexEmail } from '../../utils/data';

export default function ForgotPwPage() {
  const [ form, setForm ] = useState({
    email: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(recoverPassword(form.email));
    navigate('/reset-password', {state: {from: location}});
  }

  const onChange = (e: FormEvent) => {
    setForm({
      ...form,
      [(e.target as HTMLInputElement)?.name]: (e.target as HTMLInputElement)?.value
    });
  }

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexEmail.test(form.email));
  }, [form.email])

  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <Input 
          type='email' 
          placeholder='E-mail' 
          name='email' 
          value={form.email} 
          onChange={onChange} 
          aria-invalid={validForm ? "false" : "true"}
          />
        </fieldset>
        <Button 
        type='primary' 
        size='large' 
        htmlType='submit' 
        disabled={!validForm}>Восстановить</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className={styles.link} to="/login">Войти</Link></p>
    </div>
  ) 
};
