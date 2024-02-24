import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderIngredients, getOrderStatus, orderTotalPrice } from "../../utils/utils";
import styles from './feed-item.module.css';
import { Link, useLocation, useMatch } from "react-router-dom";

const FeedItem = ({item, orderStatus}) => {
  const items = useSelector(store => store.burgerIngredients.items);
  const ingredients = Array.from(new Set(getOrderIngredients(item.ingredients, items)));
  const [ status, setStatus ] = useState('');
  const price = orderTotalPrice(getOrderIngredients(item.ingredients, items));
  const date = item.createdAt;
  const profile = !useMatch('/profile/orders/*');
  const location = useLocation();

  const itemsToRender = () => {
    const count = ingredients.length - 6;
    let zIndex = 6;

    if(ingredients.length <= 6) {
      return (ingredients.map((el, index) => {
        zIndex -= 1;
        return <li className={styles.ingredient} style={{zIndex: zIndex}} key={index} >
          <div className="bg"></div>
          <div className="ingr">
            <img className={styles.img} src={el.image} alt={el.title} />
          </div>
        </li>
      }))
    } 
    else {
      return (ingredients.slice(0, 6).map((el, index) => {
        zIndex -= 1;
        return <li className={styles.ingredient} style={{zIndex: zIndex}} key={index} >
          <div className={styles.ingredients}>
          <img className={styles.img} src={el.image} alt={el.title} />
            { index === 5 && 
            <span className={styles.overlay}>
              <p className=' text text_type_main-default'>+{count}</p>
            </span>
            }
          </div>
        </li>
      }))
    }
  }

  useEffect(() => {
    setStatus(getOrderStatus(item.status))
  }, [])

const path = profile ? `/feed/${item.number}` : `/profile/orders/${item.number}`;
  
  return (
    <li className={styles.order}>
      <Link
      className={styles.link}
      to={{pathname: path, number: `#${item.number}`}}
      state={{ background: location }}
      >
        <div className={styles.container}>
          <p className="text text_type_digits-default">#{item.number}</p>
          <div>
            <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(date)}/> 
            <span className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
          </div>
        </div>
        <p className="text text_type_main-medium">{item.name}</p>
          {
            orderStatus &&
            <p className={status === 'Выполнен' ? styles.status_state_done : styles.status}>{status}</p>
          }
          <div className={styles.container}>
            <ul className={styles.orderImages}>
              { itemsToRender() }
            </ul>
            <div className={styles.price}>
            <p className="text text_type_digits-default pr-4">{price}</p>
            <CurrencyIcon />
          </div>
          </div>
      </Link>
    </li>
  )
};

export default FeedItem;
