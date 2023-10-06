import React, { useRef, useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ITEM_DATA, DELETE_ITEM_DATA } from '../../services/actions/modals';

const BurgerIngredients = () => {
  const [ current, setCurrent ] = useState('buns');
  const [ visibility, setVisibility ] = useState(false);

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

  const dispatch = useDispatch();
  const { items, itemsRequest } = useSelector(store => store.ingredients);

  function handleClick(item) {
    setVisibility(true);
    dispatch({type: ADD_ITEM_DATA, payload: item});
  }

  function closeModal() {
    setVisibility(false);
    dispatch({type: DELETE_ITEM_DATA});
  }

  function handleScroll() {
    const bunsInterval = Math.abs(bunsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
    const saucesInterval = Math.abs(saucesRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
    const fillingsInterval = Math.abs(fillingsRef.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);

    if(bunsInterval < saucesInterval) {
      setCurrent('buns')
    } else if(saucesInterval < fillingsInterval) {
      setCurrent('sausces')
    } else if(fillingsInterval < bunsInterval) {
      setCurrent('fillings')
    }
  }

  const modal = (
    <Modal handleClose={closeModal} title='Детали ингредиента' hasOverlay={true}>
      <IngredientDetails />
    </Modal>
  )

  function filterIngredients(data, type) {
    return data
    .filter((item) => item.type === type)
    .map((el) => <BurgerIngredient key={el._id} item={el} handleClick={() => handleClick(el)}/>)
  }

  return (
    <section className={ingredientsStyles.section}>
      <h2 className={ingredientsStyles.title}>Соберите бургер</h2>
      <ul className={ingredientsStyles.menu}>
        <li>
          <a className={ingredientsStyles.link} href="#buns">
            <Tab value="buns" active={current === 'buns'} onClick={onTabClick}>Булки</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#sauces">
            <Tab value="two" active={current === 'two'} onClick={onTabClick}>Соусы</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#fillings">
            <Tab value="three" active={current === 'three'} onClick={onTabClick}>Начинки</Tab>
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
        <li ref={saucesRef}>
          <h3 className={ingredientsStyles.subtitle}>Начинки</h3>
          { itemsRequest ? <p className={ingredientsStyles.loading}>...</p> : <ul className={ingredientsStyles.item}>
            { filterIngredients(items, 'main') }
          </ul>
          }
        </li>
      </ul>
      {visibility && modal}
    </section>
  );
};

export default BurgerIngredients;
