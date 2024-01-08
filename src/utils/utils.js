export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name, value, props = {}) {
  props = {
    path: '/',
    ...props,
  };

  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
} if (exp && exp.toUTCString) {
  props.expires = exp.toUTCString();
} 
value = encodeURIComponent(value);
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

export function deleteCookie(cookie) {
    setCookie(cookie, null, { expires: -1 });
};

export const getOrderIngredients = (arr, items) => arr?.map(el => items.find(i => el === i._id));


export function getOrderStatus(status) {
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

export function orderTotalPrice(sum) {
  return sum.reduce((arr, item) => arr += item.price, 0)
};
