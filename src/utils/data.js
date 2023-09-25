export const URL = 'https://norma.nomoreparties.space/api'; 
export const modalRoot = document.getElementById('modals');

export function countTotalSum(items) {
   return items.reduce((arr, curr) => 
      arr += curr.type === 'bun' ? curr.price*2 : curr.price, 0
   )
}