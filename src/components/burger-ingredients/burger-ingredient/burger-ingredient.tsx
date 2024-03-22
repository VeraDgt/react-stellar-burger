import React from 'react';
import ingredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { FunctionComponent } from 'react';
import { TIngredient } from '../../../types';

const BurgerIngredient: FunctionComponent<{item: TIngredient}> = ({item}) => {
  const location = useLocation();
  const id = item._id;


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item
  })
  return (
      <li className={ingredientStyles.ingredient} ref={dragRef} >
        <Link 
        className={ingredientStyles.link} 
        to={`/ingredients/${id}`} 
        state={{ background: location }}
        >
        { item.qty !== 0 && <Counter count={item.qty} size='default' /> }
        <img src={item.image} alt={item.name}/>
        <div className={ingredientStyles.priceContainer}>
          <p className={ingredientStyles.price}>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={ingredientStyles.title}>{item.name}</p>
        </Link>
      </li>
  )
}

export default BurgerIngredient;