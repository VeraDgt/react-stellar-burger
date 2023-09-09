import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsPropType } from '../../utils/prop-types';
import { data } from '../../utils/data';

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients data={ data } />
      <BurgerConstructor data={ data } />
    </main>
  );
};

Main.propTypes = {
  data: ingredientsPropType.isRequired
}

export default Main;