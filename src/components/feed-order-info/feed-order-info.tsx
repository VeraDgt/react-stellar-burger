import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../..";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { getOrderIngredients, getOrderStatus, orderTotalPrice, countItems } from "../../utils/utils";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/socket/socket-action";
import { WS_AUTH_START, WS_AUTH_CLOSED } from "../../services/socket-auth/socket-auth-action";
import styles from "./feed-order-info.module.css";
import { getExtraOrderInfo } from "../../services/modals/modals-action";
import { burgerIngredients } from "../../services/burger-ingredients/burger-ingredients-selector";
import { ordersHistory } from "../../services/socket-auth/socket-auth-selector";
import { ordersList } from "../../services/socket/socket-selector";
import { orderExtra } from "../../services/modals/modals-selector";
import { TOrder } from "../../types";
import { Preloader } from "../preloader/preloader";

const FeedOrder = () => {
  const { items } = useAppSelector(burgerIngredients);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const profile = useMatch('/profile/*');
  const orders = useAppSelector(profile ? ordersHistory : ordersList);
  const background = location.state?.background;
  const orderNum = useParams().number;
  
  const extraOrder = useAppSelector(orderExtra);

  const order = extraOrder ? extraOrder :
  orders?.orders 
  ? orders.orders.find((el: TOrder) => el.number.toString() === orderNum)
  : extraOrder;

  useEffect((): () => void => {
    dispatch(
      profile ? 
      { type: WS_AUTH_START } : 
      { type: WS_CONNECTION_START, payload: '/all'});
    return () => dispatch(profile 
      ? { type: WS_AUTH_CLOSED } 
      : { type: WS_CONNECTION_CLOSED });
  }, [dispatch, profile]);

  useEffect(() => {
    if(!orders)
      dispatch(getExtraOrderInfo(orderNum));
  }, [orders, dispatch, orderNum]);

  if (!order) return null;

  const date = order.createdAt;
  
  const ingredientsArr = getOrderIngredients(order.ingredients, items);
  const itemsToRenderArr = ingredientsArr.filter((item, i, ar) => ar.indexOf(item) == i);
  const totalPrice = orderTotalPrice(getOrderIngredients(order.ingredients, items));

  return ( order ? 
    <div className={ background ? styles.wrapper : styles.wrapper_onPage }>
      <p className={background ? styles.number : styles.number_onPage}>#{order.number}</p>
      <h1 className="text text_type_main-medium mt-10 mb-3">{order.name}</h1>
      <p className={ order.status === 'Выполнен' ? styles.status_state_done : styles.status}>{order.status}</p>
      <h2 className="text text_type_main-medium mt-15">Состав:</h2>
      <ul className={ background ? styles.list : styles.list_onPage }>
        { 
          itemsToRenderArr.map(el =>
            <li key={(el)._id} className={styles.ingredient}>
              <img className={styles.img} src={el.image} alt={el.name} />
              <p className="text text_type_main-default">{el.name}</p>
              <p className={styles.price}>{countItems(el._id, ingredientsArr)} x {el.price}</p>
              <CurrencyIcon type="primary"/>
            </li>)
        }
      </ul>
      <div className={styles.totals}>
        <p>
          <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(date)}/>
          <span className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
        </p>
        <p className={styles.price}>
          <span className="text text_type_digits-default pr-4">{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </p>
      </div>
    </div> : <Preloader />
  )
};

export default FeedOrder;