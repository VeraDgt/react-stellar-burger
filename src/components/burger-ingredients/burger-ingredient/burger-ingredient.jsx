import ingredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';

const BurgerIngredient = ({item, handleClick}) => {

  return (
      <li className={ingredientStyles.ingredient} onClick={handleClick}>
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