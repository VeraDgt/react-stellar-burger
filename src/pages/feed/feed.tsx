import React, { useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/socket/socket-action";
import styles from "./feed.module.css";
import { useAppDispatch, useAppSelector } from '../..';
import FeedItem from "../../components/feed-item/feed-item";
import { ordersListArr, ordersListQty, ordersListTodayQty } from "../../services/socket/socket-selector";
import { TOrder } from "../../types";


export default function FeedPage () {
  
  const orders = useAppSelector(ordersListArr);
  const ordersTotal = useAppSelector(ordersListQty);
  const ordersToday = useAppSelector(ordersListTodayQty);
  const dispatch = useAppDispatch();

  useEffect((): () => void => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    return () => dispatch({ type: WS_CONNECTION_CLOSED });
  }, [dispatch]);

  const doneOrdersList = (arr: Array<TOrder>) => {
    return arr
      .filter(el => el.status === 'done')
      .map(el => <li key={el.number} className={styles.done}>
        {el.number}
      </li>)
  }

  const pendingOrdersList = (arr: Array<TOrder>) => {
    return arr
      .filter(el => ( el.status === 'pending' || el.status === 'created' ))
      .map(el => <li key={el.number} className="text text_type_digits-default">
        {el.number}
      </li>)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Лента заказов</h1>
      { orders ? 
        <div className={styles.orders}>
          <div className="mr-15">
            <ul className={styles.list}>
              {
                orders.map(el => <FeedItem key={el._id} item={el} orderStatus={false} />)
              }
            </ul>
          </div>
          <div className={styles.statuses}>
            <div>
              <div  className={styles.orderNums}>
                <div className={styles.columns}>
                  <p className='text text_type_main-medium mb-6'>Готовы:</p>
                  <ul className={styles.statusesList}>
                    {
                      doneOrdersList(orders)
                    }
                  </ul>
                </div>
                <div>
                  <p className='text text_type_main-medium mb-6'>В работе:</p>
                  <ul className={styles.statusesList}>
                    {
                      pendingOrdersList(orders)
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <p className={styles.totalOrders}>{ordersTotal}</p>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <p className={styles.totalOrders}>{ordersToday}</p>
            </div>
          </div>
        </div> : <p className="loading text text_type_main-large">...</p>
      }
    </div>
  )
};
