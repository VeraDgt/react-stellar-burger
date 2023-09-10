import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsPropType } from '../../utils/prop-types';
import withModal from '../hocs/withModal';
import { data } from '../../utils/data';

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
  data: ingredientsPropType.isRequired
}

export default Main;