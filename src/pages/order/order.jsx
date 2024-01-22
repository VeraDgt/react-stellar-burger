import FeedOrder from "../../components/feed-order-info/feed-order-info";
import styles from "./order.module.css";

export default function OrderPage () {
  return (
    <div className={styles.page}>
      <section className={styles.wrapper}>
        <FeedOrder />
      </section>
    </div>
  )
};
