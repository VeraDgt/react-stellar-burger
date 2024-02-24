import type { TIngredient } from "../types";

export const URL = 'https://norma.nomoreparties.space/api'; 
export const modalRoot = document.getElementById('modals');
export const wsUrl = 'wss://norma.nomoreparties.space/orders';
export const cookieLive =1200;
export const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const regexName = /^[A-Za-z0-9\s'-]{2,30}$/;
export const regexPassword = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/;
export const regexToken = /^[a-z0-9_-]{3,37}$/;


export function countTotalSum(items: Array<TIngredient> ) {
   return items.reduce((arr, curr) => 
      arr += curr.type === 'bun' ? curr.price*2 : curr.price, 0
   )
};

export const Tabs = {
   buns: 'buns',
   sauces: 'sauces',
   fillings: 'fillings'
}

export function generateGUID(): string {
   const timestamp = new Date().getTime();
   const randomNum = Math.floor(Math.random() * 1000000);
   return `${timestamp}-${randomNum}`;
   }