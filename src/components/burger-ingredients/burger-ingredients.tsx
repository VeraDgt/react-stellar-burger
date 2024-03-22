import React, { useRef, useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { useAppSelector } from '../..';
import { burgerIngredientsArr, burgerIngredientsRequest } from '../../services/burger-ingredients/burger-ingredients-selector';
import { TIngredient } from '../../types';
import { Preloader } from '../preloader/preloader';

enum Tabs {
    buns = 'buns',
    sauces = 'sauces',
    fillings = 'fillings',
  }


const BurgerIngredients = ():JSX.Element => {
  const [ current, setCurrent ] = useState('buns');

  const bunsRef = useRef<HTMLLIElement>(null);
  const saucesRef = useRef<HTMLLIElement>(null);
  const fillingsRef = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLLIElement>(null);


  const onTabClick = (tab: string) => {
    setCurrent(tab)
    {
      tab === Tabs.buns && bunsRef.current?.scrollIntoView({behavior: 'smooth'});
      tab === Tabs.sauces && saucesRef.current?.scrollIntoView({behavior: 'smooth'});
      tab === Tabs.fillings && fillingsRef.current?.scrollIntoView({behavior: 'smooth'});
    } 
  }

  const items: Array<TIngredient> = useAppSelector(burgerIngredientsArr);
  const itemsRequest = useAppSelector(burgerIngredientsRequest);

  function handleScroll() {
    if (bunsRef.current && saucesRef.current && fillingsRef.current && containerRef.current) {
      const bunsInterval = Math.abs(bunsRef.current?.getBoundingClientRect().top - containerRef.current?.getBoundingClientRect().top);
      const saucesInterval = Math.abs(saucesRef.current?.getBoundingClientRect().top - containerRef.current?.getBoundingClientRect().top);
      const fillingsInterval = Math.abs(fillingsRef.current?.getBoundingClientRect().top - containerRef.current?.getBoundingClientRect().top);


      if(bunsInterval && saucesInterval && fillingsInterval) {
        if(bunsInterval < saucesInterval) {
          setCurrent(Tabs.buns)
        } else if(saucesInterval < fillingsInterval) {
          setCurrent(Tabs.sauces)
        } else if(fillingsInterval < bunsInterval) {
          setCurrent(Tabs.fillings)
        }
      }
    }
  }

  function filterIngredients(data: Array<TIngredient>, type: string) {
    return data
    .filter((item) => item.type === type)
    .map((el) => <BurgerIngredient key={el._id} item={el}/>)
  }

  return (
    <section className={ingredientsStyles.section} ref={containerRef}>
      <h2 className={ingredientsStyles.title}>Соберите бургер</h2>
      <ul className={ingredientsStyles.menu}>
        <li>
          <a className={ingredientsStyles.link} href="#buns">
            <Tab 
            value={Tabs.buns} 
            active={current === 'buns'} 
            onClick={onTabClick}>Булки</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#sauces">
            <Tab value={Tabs.sauces} active={current === 'sauces'} onClick={onTabClick}>Соусы</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#fillings">
            <Tab value={Tabs.fillings} active={current === 'fillings'} onClick={onTabClick}>Начинки</Tab>
          </a>  
        </li>
      </ul>

      <ul className={`${ingredientsStyles.items} custom-scroll`} onScroll={handleScroll}>
        <li ref={bunsRef}>
          <h3 className={ingredientsStyles.subtitle}>Булки</h3>
          { itemsRequest ? <Preloader /> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'bun') }
          </ul>
          }
        </li>
        <li ref={saucesRef}>
          <h3 className={ingredientsStyles.subtitle}>Соусы</h3>
          { itemsRequest ? <Preloader /> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'sauce') }
          </ul>
          }
        </li>
        <li ref={fillingsRef}>
          <h3 className={ingredientsStyles.subtitle}>Начинки</h3>
          { itemsRequest ? <Preloader /> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'main') }
          </ul>
          }
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;