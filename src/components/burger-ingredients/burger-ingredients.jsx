import { useContext, useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Context, ItemsContext, CurrentItemContext } from '../../services/context';
import BurgerIngredient from './burger-ingredient/burger-ingredient';

const BurgerIngredients = () => {
  const [ current, setCurrent ] = useState('one');
  const [ visibility, setVisibility ] = useState(false);
  const { state, setState } = useContext(Context);
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);
  const { items, setItems } = useContext(ItemsContext);
  const data = state.data;

  function handleClick(item) {
    setVisibility(true);
    setCurrentItem(item);
    setState(
      { ...state, data: state.data.map((el) => {
        if(el._id === item._id) {
          return el.type !== 'bun' ? {...el, qty: ++el.qty} : {...el, qty: 1}
        } else {
          return el.type !== 'bun' ? el : item.type === 'bun' ? {...el, qty: 0} : el
        }
      })
      }
    )

    setItems(item.type !== 'bun' ?
      [...items, item] : () => {
        const index = [...items].findIndex((el) => el.type === 'bun');
        const newState = [...items];

        if(index !== -1) {
          newState[index] = item
          return newState
        } else {
          return [...items, item]
        }
      }
    )
  }

  function closeModal() {
    setVisibility(false)
  }

  const modal = (
    <Modal handleClose={closeModal} title='Детали ингредиента' hasOverlay={true}>
      <IngredientDetails item={currentItem}/>
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
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#sauces">
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
          </a>
        </li>
        <li>
          <a className={ingredientsStyles.link} href="#fillings">
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
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
        <li id='sauces'>
          <h3 className={ingredientsStyles.subtitle}>Соусы</h3>
          <ul className={ingredientsStyles.item}>
            { filterIngredients(data, 'sauce') }
          </ul>
        </li>
        <li id='fillings'>
          <h3 className={ingredientsStyles.subtitle}>Начинки</h3>
          <ul className={ingredientsStyles.item}>
            { filterIngredients(data, 'main') }
          </ul>
        </li>
      </ul>
      {visibility && modal}
    </section>
  );
};

export default BurgerIngredients;
