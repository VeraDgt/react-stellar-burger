import ingredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import IngredientDetails from '../../ingredient-details/ingredient-details';

const BurgerIngredient = ({item, openModal, closeModal, visibility}) => {
  const modal = (
    <IngredientDetails item={item} handleClose={closeModal} title='Детали ингредиента'/>
  )

  return (
    <>
      <li className={ingredientStyles.ingredient} onClick={openModal}>
        { item.count !== undefined && <Counter count={item.count} size='default' /> }
        <img src={item.image} alt={item.title}/>
        <div className={ingredientStyles.priceContainer}>
          <p className={ingredientStyles.price}>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={ingredientStyles.title}>{item.name}</p>
      </li>
      {visibility && modal}
    </>
  )
}

BurgerIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired
}

export default BurgerIngredient;