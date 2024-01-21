import React, { useState, useEffect } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../services/actions/auth';
import { regexEmail, regexPassword } from '../../utils/data';

export default function LoginPage() {
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  });

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexEmail.test(form.email));
    setValidForm(regexPassword.test(form.password));
  }, [form.email, form.password])

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(form))
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }


  return (
    <div className={styles.page}>
      <h1 className='text text_type_main-medium'>Вход</h1>
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
          <PasswordInput 
          name='password' 
          value={form.password} 
          onChange={onChange}
          aria-invalid={validForm ? "false" : "true"} 
          />
        </fieldset>
        <Button type='primary' size='large' htmlType='submit' disabled={!validForm}>Войти</Button>
      </form>
      <p className="mt-20 text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link className="link" to="/register">Зарегистрироваться</Link></p>
            <p className="mt-4 text text_type_main-default text_color_inactive">Забыли пароль? <Link className="link" to="/forgot-password">Восстановить пароль</Link></p>
    </div>
  )
}
