export const URL = 'https://norma.nomoreparties.space/api'; 
export const modalRoot = document.getElementById('modals');
export const wsUrl = 'wss://norma.nomoreparties.space/orders';
export const cookieLive = 3600;

export function countTotalSum(items) {
   return items.reduce((arr, curr) => 
      arr += curr.type === 'bun' ? curr.price*2 : curr.price, 0
   )
}