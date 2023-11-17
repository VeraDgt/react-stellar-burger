import { URL } from './data';
import { getCookie, setCookie } from './utils';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getIngredients() {
  return request(`${URL}/ingredients`);
}

const getUser = () => {
  return fetch(`${URL}/auth/user`, {
  method: 'GET',
  headers: { 
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken')
    }
  })
  .then(res => res.json())
}

const login = (user) => {
  return request(`${URL}/auth/login`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: user.email, 
        password: user.password
    })
  })
}

const register = (user) => {
  return request(`${URL}/auth/register`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email, 
      password: user.password
    })
})
}

const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const api = {
  getUser,
  login,
  register,
  logout
};

export function getOrderNumber(arr) {
  return request(`${URL}/orders`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: arr
    })
  })
}
