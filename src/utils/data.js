import BurgerIngredient from '../components/burger-ingredients/burger-ingredient/burger-ingredient';

export const URL = 'https://norma.nomoreparties.space/api'; 
export const modalRoot = document.getElementById('modals');

export function countTotalSum(data) {
   return data.reduce((arr, curr) => 
      arr += curr.type === 'bun' ? curr.proce*2 : curr.price, 0
   )
}
