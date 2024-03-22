import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../..";
import { WS_AUTH_START, WS_AUTH_CLOSED } from "../../services/socket-auth/socket-auth-action";
import styles from "./profile-orders.module.css";
import FeedItem from "../feed-item/feed-item";
import { ordersHistoryArr } from "../../services/socket-auth/socket-auth-selector";
import { TOrder } from "../../types";
import { Preloader } from "../preloader/preloader";

const ProfileOrders = () => {
  const orders = useAppSelector(ordersHistoryArr);
  const dispatch = useAppDispatch();

  useEffect((): () => void => {
    dispatch({ type: WS_AUTH_START });
    return () => dispatch({ type: WS_AUTH_CLOSED });
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      { orders ? 
        orders.map((el: TOrder) => <FeedItem key={el._id} item={el} orderStatus={true} />)
        : <Preloader />
      }
    </ul>
  )
};

export default ProfileOrders;
