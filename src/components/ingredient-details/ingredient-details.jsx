import Modal from '../modal/modal';
import detailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

const IngredientDetails = ({ item, handleClose }) => {
  return (
    <Modal handleClose={handleClose} title='Детали ингредиента' hasOverlay={true}>
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
  );
};

IngredientDetails.propTypes = {
  item: ingredientPropType.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default IngredientDetails;