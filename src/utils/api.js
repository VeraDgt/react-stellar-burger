import { URL } from './data';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`)
}

export default function getIngredients(setState, state) {
  return fetch(`${URL}/ingredients`)
    .then(res => checkResponse(res))
    .then(res => setState({
      ...state, 
      data: res.data.map((el) => {
          return { ...el, qty: 0}
      })
    })
  )
    .catch(err => console.log(err))
}

export function getOrderNumber(arr, setState) {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: arr
    })
  })
  .then(res => checkResponse(res))
  .then(res => setState(res.order.number))
}
