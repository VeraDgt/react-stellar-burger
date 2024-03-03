import { URL } from './data';
import { getCookie } from './utils';
import { TRes, TUser, TForm } from '../types';

const checkResponse = (res: Response) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

const checkSuccess = (res: TRes) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint: string, options?: RequestInit) {
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
  headers:  { 
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken')
    } as HeadersInit
  })
};

const login = (user: TUser) => {
  return request("/auth/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: user.email, 
        password: user.password
    })
  })
}

const register = (user: TUser) => {
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

const recoverPassword = (email: string) => {
  return request("/password-reset", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    email: email
    })
  })
};

const resetPassword = (form: TForm) => {
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

const updateUser = (user: TUser) => {
  return request("/auth/user", {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie('accessToken')
    } as HeadersInit,
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

export function getOrderNumber(arr: Array<string>) {
  return request("/orders", {
    method: 'POST',
    headers: { "Content-Type": "application/json",
              Authorization: getCookie('accessToken') } as HeadersInit,
    body: JSON.stringify({
      ingredients: arr
    })
  })
};

export function getExtraOrder(number: string | undefined) {
  return request(`/orders/${number}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json",
    Authorization: getCookie('accessToken') } as HeadersInit
  })
};
