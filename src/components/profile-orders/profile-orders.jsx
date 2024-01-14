import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WS_AUTH_START, WS_AUTH_CLOSED } from "../../services/actions/socket-auth";
import styles from "./profile-orders.module.css";
import FeedItem from "../feed-item/feed-item";

const ProfileOrders = () => {
  const { orders } = useSelector(store => store.ordersHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_AUTH_START });
    return () => dispatch({ type: WS_AUTH_CLOSED });
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      { orders ? 
        orders.orders.map(el => <FeedItem key={el._id} item={el} orderStatus={true} />)
        : <p className="loading text text_type_main-large">...</p>
      }
    </ul>
  )
};

export default ProfileOrders;
