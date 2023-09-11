import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsPropType } from '../../utils/prop-types';
import withModal from '../hocs/withModal';
import PropTypes from 'prop-types';

const Main = ({ data }) => {
  const WithModalBurgerConstructor = withModal(BurgerConstructor);

  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={ data } />
      <WithModalBurgerConstructor data={ data } />
    </main>
  );
};

Main.propTypes = {
  data: ingredientsPropType,
  data: PropTypes.array
}

export default Main;