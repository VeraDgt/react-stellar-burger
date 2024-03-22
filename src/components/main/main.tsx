import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '../..';
import { GET_BURGER_DATA } from '../../services/burger-constructor/burger-constructor-action';
import { INCREASE_QTY } from '../../services/burger-ingredients/burger-ingredients-action';
import { v4 } from 'uuid';
import { TIngredient } from '../../types';


const Main = () => {
  const dispatch = useAppDispatch();

  const handleDrop = (item: TIngredient) => {
    dispatch({ type: INCREASE_QTY, payload: item });
    dispatch({ type: GET_BURGER_DATA, payload: item, key: v4() });
  }

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor dropHandler={handleDrop}/>
      </DndProvider>
    </main>
  );
};

export default Main;