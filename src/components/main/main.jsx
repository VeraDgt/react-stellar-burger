import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { GET_CHOSEN_ITEMS } from '../../services/actions/burger-constructor';
import { INCREASE_QTY } from '../../services/actions/burger-ingredients';
import { v4 } from 'uuid';


const Main = () => {
  const dispatch = useDispatch();

  const handleDrop = (item) => {
    dispatch({ type: INCREASE_QTY, payload: item });
    dispatch({ GET_CHOSEN_ITEMS, payload: item, key: v4() });
  }

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop}/>
      </DndProvider>
    </main>
  );
};

export default Main;