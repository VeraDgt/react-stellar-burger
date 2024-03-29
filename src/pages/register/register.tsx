import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/login.module.css';
import { useAppDispatch } from '../..';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../services/user-auth/auth-action';
import { regexName, regexEmail, regexPassword } from '../../utils/data';
import { getCookie } from '../../utils/utils';

export default function RegisterPage() {
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(register(form));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [(e.target)?.name]: (e.target)?.value
    });
  }

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexName.test(form.name));
    setValidForm(regexEmail.test(form.email));
    setValidForm(regexPassword.test(form.password));
  }, [form.name, form.email, form.password])

  if(getCookie('accessToken') !== 'false') {
    return (
      <Navigate to={'/'}/>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className='form' onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <Input 
          type='text' 
          placeholder='Имя' 
          name='name' 
          value={form.name} 
          onChange={onChange}
          aria-invalid={validForm ? "false" : "true"}
          />
          <Input 
          type='email' 
          placeholder='E-mail' 
          name='email' 
          value={form.email} 
          onChange={onChange}
          aria-invalid={validForm ? "false" : "true"}
          />
          <PasswordInput 
          name='password' 
          value={form.password} 
          onChange={onChange}
          aria-invalid={validForm ? "false" : "true"}
          />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit' disabled={!validForm}>Войти</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className="link" to="/login">Войти</Link></p>
    </div>
  )
};
