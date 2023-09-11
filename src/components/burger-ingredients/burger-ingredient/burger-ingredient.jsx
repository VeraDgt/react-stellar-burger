import ingredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import detailsStyles from '../../ingredient-details/ingredient-details.module.css';

const BurgerIngredient = ({item, openModal, closeModal, visibility}) => {
  const modal = (
    <Modal handleClose={closeModal} title='Детали ингредиента' hasOverlay={true}>
      <img src={item.image_large} alt={item.title} />
      <p className={detailsStyles.name}>{item.name}</p>
      <div className={detailsStyles.container}>
        <p className={detailsStyles.parameter}>Калории,ккал
        <span className={detailsStyles.text}>{item.calories}</span>
        </p>
        <p className={detailsStyles.parameter}>Белки, г
        <span className={detailsStyles.text}>{item.proteins}</span>
        </p>
        <p className={detailsStyles.parameter}>Жиры, г
        <span className={detailsStyles.text}>{item.fat}</span>
        </p>
        <p className={detailsStyles.parameter}>Углеводы, г
        <span className={detailsStyles.text}>{item.carbohydrates}</span>
        </p>
      </div>
    </Modal>
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