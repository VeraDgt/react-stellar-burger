import React, { useState, useEffect } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/login.module.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, RedirectFunction } from 'react-router-dom';
import { register } from '../../services/actions/auth';
import { regexName, regexEmail, regexPassword } from '../../utils/data';

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

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexName.test(form.name));
    setValidForm(regexEmail.test(form.email));
    setValidForm(regexPassword.test(form.password));
  }, [form.name, form.email, form.password])

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
