import { url } from './data';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

export default function getIngredients(setData) {
  return fetch(url)
    .then(res => checkResponse(res))
    .then(res => setData(res.data))
    .catch(err => console.log(err))
}
