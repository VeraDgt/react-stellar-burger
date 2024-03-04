import React, { useEffect, useState, FormEvent } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../..';
import styles from './profile-data.module.css';
import { GET_USER, getUser, updateUser } from '../../services/user-auth/auth-action';
import { regexName, regexEmail, regexPassword } from '../../utils/data';
import { currUser, currUserName, currUserEmail, currUserPassword } from '../../services/user-auth/auth-selector';

const ProfileData = () => {
  const dispatch = useAppDispatch();
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const user = useAppSelector(currUser);
  const userName = useAppSelector(currUserName);
  const userEmail = useAppSelector(currUserEmail);
  const userPassword = useAppSelector(currUserPassword);

  useEffect(() => {
    dispatch(getUser());
    user && setForm({
      name: userName ? userName : '',
      email: userEmail ? userEmail : '',
      password: userPassword ? userPassword : '',
    })
  }, [dispatch, userName, userEmail, userPassword ]);

  const onChange = (e: FormEvent) => {
    setForm({
      ...form,
      [(e.target as HTMLInputElement)?.name]: (e.target as HTMLInputElement)?.value
    })
  }

  const [ validForm, setValidForm ] = useState(false);

  useEffect(() => {
    setValidForm(regexName.test(form.name));
    setValidForm(regexEmail.test(form.email));
    setValidForm(regexPassword.test(form.password));
  }, [form.name, form.email, form.password])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  }

  const resetForm = () => {
    setForm({
      name: userName ? userName : '',
      email: userEmail ? userEmail : '',
      password: userPassword ? userPassword : '',
    })
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.fieldset}>
        <Input 
          type='text'
          name='name'
          placeholder='Имя'
          value={form.name}
          onChange={onChange}
          icon="EditIcon"
          aria-invalid={validForm ? "false" : "true"}
          >
        </Input>
        <Input 
          type='text'
          name='email'
          placeholder='Логин'
          value={form.email}
          onChange={onChange}
          icon="EditIcon"
          aria-invalid={validForm ? "false" : "true"}
          >
        </Input>
        <Input 
          type='password'
          name='password'
          placeholder='Пароль'
          value={form.password}
          onChange={onChange}
          icon="EditIcon"
          aria-invalid={validForm ? "false" : "true"}
          >
        </Input>
      </fieldset>
      { (form.name !== userName  || form.email !== userEmail  || form.password !== userPassword) && validForm ?
        <>
          <Button type='secondary' htmlType='button' onClick={resetForm}>Отмена</Button>
          <Button htmlType='submit'>Сохранить</Button>
        </>
        : null
      }
    </form>
  )
}

export default ProfileData;