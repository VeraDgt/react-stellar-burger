import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import { data } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Main = () => {
  return (
    <main>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
};

export default Main;