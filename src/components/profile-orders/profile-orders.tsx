import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../..";
import { WS_AUTH_START, WS_AUTH_CLOSED } from "../../services/socket-auth/socket-auth-action";
import styles from "./profile-orders.module.css";
import FeedItem from "../feed-item/feed-item";
import { ordersHistory } from "../../services/socket-auth/socket-auth-selector";
import { TOrder } from "../../types";

const ProfileOrders = () => {
  const orders = useAppSelector(ordersHistory);
  const dispatch = useAppDispatch();

  useEffect((): () => void => {
    dispatch({ type: WS_AUTH_START });
    return () => dispatch({ type: WS_AUTH_CLOSED });
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      { orders ? 
        orders.map((el: TOrder) => <FeedItem key={el._id} item={el} orderStatus={true} />)
        : <p className="loading text text_type_main-large">...</p>
      }
    </ul>
  )
};

export default ProfileOrders;
