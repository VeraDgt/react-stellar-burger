import React from 'react';
import orderStyles from './order-details.module.css';
import img from '../../images/done.png';
import { useAppSelector } from '../..';
import { orderNum, orderRequest } from '../../services/modals/modals-selector';
import { Preloader } from '../preloader/preloader';

const OrderDetails = () => {
  const order = useAppSelector(orderNum);
  const orderRequestActive = useAppSelector(orderRequest);

  return (
    <>
      { orderRequestActive ? <Preloader /> :
      <p className={orderStyles.number}>{order}</p>
      }
      <p className={orderStyles.text}>идентификатор заказа</p>
      <img src={img} alt='Заказ принят' className={orderStyles.img}/>
      <p className={orderStyles.infoText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.delivery}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;