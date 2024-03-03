import { TCookieProps, TIngredient } from "../types";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name: string, value: string | number | boolean | undefined, props?: TCookieProps) {
  props = {
    path: '/',
    ...props,
  };

  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
} if (exp && exp.toString) {
  props.expires = exp.toString();
} 
value = encodeURIComponent(value!);
let updatedCookie = name + "=" + value;
for (const propName in props) {
  updatedCookie += '; ' + propName;
  const propValue = props[propName];
  if (propValue !== true) {
      updatedCookie += '=' + propValue;
  }
}
document.cookie = updatedCookie;
}

export function deleteCookie(cookie: string) {
    setCookie(cookie, false, { expires: -1 });
};

export const getOrderIngredients = (arr: Array<string>, items: Array<TIngredient>) => arr?.map(el => items.find(i => el === i._id)!);

export const countItems = (arr: Array<TIngredient>) => {
  return arr.reduce((sum: {ingredient: {[id:string]:TIngredient}, qty:{[id: string]: number}}, el) =>{
    const id = el._id
    sum.ingredient[id] = el;
    sum.qty[id] = (sum.qty[id] || 0) +1
    return sum
  }, { ingredient: {}, qty: {} })
}

export function getOrderStatus(status: string) {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return '';
  }
};

export function orderTotalPrice(sum: Array<TIngredient>) {
  return sum.reduce((arr, item) => arr += item.price, 0)
};