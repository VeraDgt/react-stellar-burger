import { useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { TotalSumContext, CurrentItemContext } from '../../services/context';


const Main = () => {
  const [totalSum, setTotalSum] = useState(0);
  const [ currentItem, setCurrentItem] = useState({});

  return (
    <main className={mainStyles.main}>
      <CurrentItemContext.Provider value={{currentItem, setCurrentItem}}>
        <BurgerIngredients />
      </CurrentItemContext.Provider>
      <TotalSumContext.Provider value={{totalSum, setTotalSum}}>
        <BurgerConstructor />
      </TotalSumContext.Provider>
    </main>
  );
};

export default Main;