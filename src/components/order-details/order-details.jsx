import { useContext, useEffect, useState } from 'react';
import orderStyles from './order-details.module.css';
import img from '../../images/done.png';
import { ItemsContext } from '../../services/context';
import { getOrderNumber } from '../../utils/api';

const OrderDetails = () => {
  const [number, setNumber] = useState(null);
  const { items } = useContext(ItemsContext);
  const data = items.map((el) => el._id);

  useEffect(() => {
    getOrderNumber(data, setNumber)
  }, [])

  return (
    <>
      <p className={orderStyles.number}>{number}</p>
      <p className={orderStyles.text}>идентификатор заказа</p>
      <img src={img} alt='Заказ принят' className={orderStyles.img}/>
      <p className={orderStyles.infoText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.delivery}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;