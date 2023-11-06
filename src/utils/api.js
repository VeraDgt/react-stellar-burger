import { URL } from './data';

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

const getUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {},
      });
    }, 1000);
  });

const login = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken: "test-token",
        refreshToken: "test-refresh-token",
        user: {},
      });
    }, 1000);
  });

const logout = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });  

export const api = {
  getUser,
  login,
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
