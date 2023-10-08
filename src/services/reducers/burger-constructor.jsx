import { GET_BURGER_DATA, DELETE_ITEM, DRAG_ITEM, CLEAR_CONSTRUCTOR } from "../actions/burger-constructor";

const initialState = {
  bun: null,
  burgersData: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  function addBun(state, action) {
    const index = [...state.burgersData].findIndex((el) => el.type === 'bun');
    const newState = [...state.burgersData];

    if(index !== -1) {
      newState[index] = {...action.payload, key: action.key}
      return newState
    } else {
      return [...state.burgersData, {...action.payload, key: action.key}]
    }
  }

  switch (action.type) {
    case GET_BURGER_DATA: {
      return {
        ...state,
        burgersData: action.payload.type !== 'bun' ? 
        [...state.burgersData, {...action.payload, key: action.key}]
        : addBun(state, action)
      }
    }

    case DELETE_ITEM: {
      return {
        ...state, 
        burgersData: [...state.burgersData].filter((el, index, arr) => {
          if(el._id !== action.payload._id) {
            return el
          } else if(index !== arr.indexOf(action.payload) && el._id === action.payload._id) {
            return el
          }
        })
      }
    }

    case DRAG_ITEM: {
      const filling = [...state.burgersData].filter(el => el.type !== 'bun');
      const bun = [...state.burgersData].filter(el => el.type === 'bun');
      filling.splice(action.hoverIndex, 0, filling.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        burgersData: filling.concat(bun)
      }
    }

    case CLEAR_CONSTRUCTOR: {
      return { ...state, burgersData: [] }
    }

    default: {
      return state;
    }
  }
}