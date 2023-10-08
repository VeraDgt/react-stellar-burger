import React, { useEffect } from 'react';
import orderStyles from './order-details.module.css';
import img from '../../images/done.png';
import { getOrder } from '../../services/actions/modals';
import { useDispatch, useSelector } from 'react-redux';


const OrderDetails = () => {
  const burgersData = useSelector(store => store.burgerConstructor.burgersData);
  const idArr = burgersData.map((el) => el._id);
  const { order, orderRequest } = useSelector(store => store.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(idArr))
  }, [dispatch])

  return (
    <>
      { orderRequest ? <p className='text text_type_main-large'>...</p> :
      <p className={orderStyles.number}>{order.number}</p>
      }
      <p className={orderStyles.text}>идентификатор заказа</p>
      <img src={img} alt='Заказ принят' className={orderStyles.img}/>
      <p className={orderStyles.infoText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.delivery}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;