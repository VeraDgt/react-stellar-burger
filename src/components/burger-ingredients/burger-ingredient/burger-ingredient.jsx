import React from 'react';
import ingredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

const BurgerIngredient = ({item, handleClick}) => {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item
  })

  return (
      <li className={ingredientStyles.ingredient} onClick={handleClick} ref={dragRef}>
        { item.qty !== 0 && <Counter count={item.qty} size='default' /> }
        <img src={item.image} alt={item.title}/>
        <div className={ingredientStyles.priceContainer}>
          <p className={ingredientStyles.price}>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={ingredientStyles.title}>{item.name}</p>
      </li>
  )
}

BurgerIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default BurgerIngredient;