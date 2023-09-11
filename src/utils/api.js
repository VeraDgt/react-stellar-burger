import { URL } from './data';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

export default function getIngredients() {
  return fetch(URL)
    .then(res => checkResponse(res))
    .then(res => (res.data))
    .catch(err => console.log(err))
}
