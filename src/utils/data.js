export const URL = 'https://norma.nomoreparties.space/api'; 
export const modalRoot = document.getElementById('modals');
export const wsUrl = 'wss://norma.nomoreparties.space/orders';
export const cookieLive = 3600;
export const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const regexName = /^[A-Za-z0-9\s'-]{2,30}$/;
export const regexPassword = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
export const regexToken = /^[a-z0-9_-]{3,37}$/;

export function countTotalSum(items) {
   return items.reduce((arr, curr) => 
      arr += curr.type === 'bun' ? curr.price*2 : curr.price, 0
   )
}