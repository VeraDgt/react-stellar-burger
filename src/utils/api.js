import { URL } from './data';
import { getCookie } from './utils';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint, options) {
  return fetch(`${URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);
}

export function getIngredients() {
  return request("/ingredients");
}

const getUser = () => {
  return request("/auth/user", {
  method: 'GET',
  headers: { 
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken')
    }
  })
};

const login = (user) => {
  return request("/auth/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: user.email, 
        password: user.password
    })
  })
}

const register = (user) => {
  return request("/auth/register", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email, 
      password: user.password
    })
  })
};

const recoverPassword = (email) => {
  return request("/password-reset", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    email: email
    })
  })
};

const resetPassword = (form) => {
  return request("/password-reset/reset", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: form.password,
      token: form.token
    })
  })
};

const getToken = () => {
  return request("/auth/token", {
    method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
};

const updateUser = (user) => {
  return request("/auth/user", {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken')
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    })
  })
};

const logout = () => {
  return request("/auth/logout", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
};  

export const api = {
  getUser,
  login,
  register,
  recoverPassword,
  resetPassword,
  getToken,
  updateUser,
  logout
};

export function getOrderNumber(arr) {
  return request("/orders", {
    method: 'POST',
    headers: { "Content-Type": "application/json",
              Authorization: getCookie('accessToken') },
    body: JSON.stringify({
      ingredients: arr
    })
  })
};

export function getExtraOrder(number) {
  return request(`/orders/${number}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    Authorization: getCookie('accessToken'),
  })
};
