import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { getOrderIngredients, getOrderStatus, orderTotalPrice, countItems } from "../../utils/utils";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/socket";
import { WS_AUTH_START, WS_AUTH_CLOSED } from "../../services/actions/socket-auth";
import styles from "./feed-order-info.module.css";

const FeedOrder = () => {
  const { items } = useSelector(store => store.burgerIngredients);
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = !useMatch('/profile');
  const { orders } = useSelector(store => profile ? store.ordersHistory : store.ordersList);
  const background = location.state?.background;
  const id = useParams().number;

  const [ order, setOrder ] = useState({
    name: '',
    status: '',
    date: '',
    OrderNum: '',
    orderIngrs: []
  });

  const item = orders?.orders ? orders?.orders.find(el => el._id === id) : {
    name: '',
    status: '',
    date: '', 
    OrderNum: '',
    orderIngrs: []
  };


  useEffect(() => {
    dispatch(profile ? { type: WS_AUTH_START } : { type: WS_CONNECTION_START, payload: '/all'});
    return () => dispatch(profile ? { type: WS_AUTH_CLOSED } : { type: WS_CONNECTION_CLOSED });
  }, [dispatch, profile]);

  useEffect(() => {
    setOrder({
      ...order,
      name: item?.name,
      status: getOrderStatus(item?.status),
      date: item?.createdAt, 
      orderNum: item?.number,
      orderIngrs: Array.from(new Set(getOrderIngredients(item?.ingredients, items)))
    });
  }, [orders?.orders]);


  if (!orders) return null;

  const date = order.date !== '' && order.date;
  const totalPrice = orderTotalPrice(getOrderIngredients(item?.ingredients, items));
  const { qty } = countItems(getOrderIngredients(item?.ingredients, items));

  return ( orders ? 
    <div className={ background ? styles.wrapper : styles.wrapper_onPage }>
      <p className={background ? styles.number : styles.number_onPage}>#{order.orderNum}</p>
      <h1 className="text text_type_main-medium mt-10 mb-3">{order.name}</h1>
      <p className={ order.status === 'Выполнен' ? styles.status_state_done : styles.status}>{order.status}</p>
      <h2 className="text text_type_main-medium mt-15">Состав:</h2>
      <ul className={ background ? styles.list : styles.list_onPage }>
        {
          order.orderIngrs.map(el =>
            <li key={el._id} className={styles.ingredient}>
              <img className={styles.img} src={el.image} alt={el.name} />
              <p className="text text_type_main-default">{el.name}</p>
              <p className={styles.price}>{qty[el._id]} x {el.price}</p>
              <CurrencyIcon />
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
          <CurrencyIcon />
        </p>
      </div>
    </div> : <p className="loading text text_type_main-large">...</p>
  )
};

export default FeedOrder;
