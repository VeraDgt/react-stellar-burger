import React from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropType } from '../../utils/prop-types';
import filterIngredients from '../../utils/data';

const BurgerIngredients = ({ data }) => {
  // const [current, setCurrent] = React.useSate('one');

  return (
    <section className={ingredientsStyles.section}>
      <h2 className={ingredientsStyles.title}>Соберите бургер</h2>
      <ul className={ingredientsStyles.menu}>
        <li>
          <a className={ingredientsStyles.link} href="#buns">
            {/* <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab> */}
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#sauces">
            {/* <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab> */}
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#fillings">
            {/* <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab> */}
          </a>
        </li>
      </ul>

      <ul className={`${ingredientsStyles.items} custom-scroll`}>
        <li id='buns'>
          <h3 className={ingredientsStyles.subtitle}>Булки</h3>
          <ul className={ingredientsStyles.item}>
            { filterIngredients(data, 'bun') }
          </ul>
        </li>
        <li id='sauses'>
          <h3 className={ingredientsStyles.subtitle}>Соусы</h3>
          <ul className={ingredientsStyles.item}>
            { filterIngredients(data, 'sause') }
          </ul>
        </li>
        <li id='fillings'>
          <h3 className={ingredientsStyles.subtitle}>Начинки</h3>
          <ul className={ingredientsStyles.item}>
            { filterIngredients(data, 'main') }
          </ul>
        </li>

      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: ingredientsPropType.isRequired
}

export default BurgerIngredients;
