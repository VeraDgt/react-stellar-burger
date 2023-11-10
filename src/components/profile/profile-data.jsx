import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-data.module.css';

const ProfileData = () => {
  const dispatch = useDispatch();
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { user } = useSelector(store => store.user);

  return (
    <form className='ml-15 mt-20'>
      <fieldset className='fieldset mb-6'>
        <Input 
          type='text'
          name='name'
          placeholder='Имя'>
        </Input>
        <Input 
          type='text'
          name='email'
          placeholder='Логин'>
        </Input>
        <Input 
          type='password'
          name='password'
          placeholder='Пароль'>
        </Input>
      </fieldset>
      {
        <>
          <Button type='secondary' htmlType='button'>Отмена</Button>
          <Button type='secondary' htmlType='button'>Сохранить</Button>
        </>
      }
    </form>
  )
}

export default ProfileData;