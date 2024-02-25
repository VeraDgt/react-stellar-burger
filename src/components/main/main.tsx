import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { GET_BURGER_DATA } from '../../services/actions/burger-constructor';
import { INCREASE_QTY } from '../../services/burger-ingredients/burger-ingredients-action';
import { v4 } from 'uuid';
import { TIngredient } from '../../types';


const Main = () => {
  const dispatch = useDispatch();

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