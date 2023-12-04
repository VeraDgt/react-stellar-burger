import React, { useRef, useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { useSelector } from 'react-redux';


const BurgerIngredients = () => {
  const [ current, setCurrent ] = useState('buns');

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const fillingsRef = useRef(null);
  const containerRef = useRef(null);

  const onTabClick = (tab) => {
    setCurrent(tab)
    tab === 'buns' && bunsRef.current.scrollIntoView({behaviour: 'smooth'});
    tab === 'sauces' && saucesRef.current.scrollIntoView({behaviour: 'smooth'});
    tab === 'fillings' && fillingsRef.current.scrollIntoView({behaviour: 'smooth'});
  }

  const { items, itemsRequest } = useSelector(store => store.burgerIngredients);

  function handleScroll() {
    const bunsInterval = Math.abs(bunsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
    const saucesInterval = Math.abs(saucesRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
    const fillingsInterval = Math.abs(fillingsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);

    if(bunsInterval < saucesInterval) {
      setCurrent('buns')
    } else if(saucesInterval < fillingsInterval) {
      setCurrent('sauces')
    } else if(fillingsInterval < bunsInterval) {
      setCurrent('fillings')
    }
  }

  function filterIngredients(data, type) {
    return data
    .filter((item) => item.type === type)
    .map((el) => <BurgerIngredient key={el._id} item={el} />)
  }

  return (
    <section className={ingredientsStyles.section} ref={containerRef}>
      <h2 className={ingredientsStyles.title}>Соберите бургер</h2>
      <ul className={ingredientsStyles.menu}>
        <li>
          <a className={ingredientsStyles.link} href="#buns">
            <Tab value="buns" active={current === 'buns'} onClick={onTabClick}>Булки</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#sauces">
            <Tab value="sauces" active={current === 'sauces'} onClick={onTabClick}>Соусы</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#fillings">
            <Tab value="fillings" active={current === 'fillings'} onClick={onTabClick}>Начинки</Tab>
          </a>  
        </li>
      </ul>

      <ul className={`${ingredientsStyles.items} custom-scroll`} onScroll={handleScroll}>
        <li ref={bunsRef}>
          <h3 className={ingredientsStyles.subtitle}>Булки</h3>
          { itemsRequest ? <p className={ingredientsStyles.loading}>...</p> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'bun') }
          </ul>
          }
        </li>
        <li ref={saucesRef}>
          <h3 className={ingredientsStyles.subtitle}>Соусы</h3>
          { itemsRequest ? <p className={ingredientsStyles.loading}>...</p> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'sauce') }
          </ul>
          }
        </li>
        <li ref={fillingsRef}>
          <h3 className={ingredientsStyles.subtitle}>Начинки</h3>
          { itemsRequest ? <p className={ingredientsStyles.loading}>...</p> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'main') }
          </ul>
          }
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
