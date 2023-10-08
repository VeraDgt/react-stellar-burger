import { GET_CHOSEN_ITEMS, SET_TOTAL_SUM, DELETE_ITEM, DRAG_ITEM, CLEAR_CONSTRUCTOR } from "../actions/burger-constructor";

const initialState = {
  chosenItems: [],
  price: 0
}

export const burgerConstructorReducer = (state = initialState, action) => {
  function addBun(state, action) {
    const index = [...state.chosenItems].findIndex((el) => el.type === 'bun');
    const newState = [...state.chosenItems];

    if(index !== -1) {
      newState[index] = {...action.payload, key: action.key}
      return newState
    } else {
      return [...state.chosenItems, {...action.payload, key: action.key}]
    }
  }

  switch (action.type) {
    case GET_CHOSEN_ITEMS: {
      return {
        ...state,
        chosenItems: action.payload.type !== 'bun' ? 
        [...state.chosenItems, {...action.payload, key: action.key}]
        : addBun(state, action)
      }
    }

    case SET_TOTAL_SUM: {
      return {
        ...state,
        price: action.payload
      }
    }

    case DELETE_ITEM: {
      return {
        ...state, 
        chosenItems: [...state.chosenItems].filter((el, index, arr) => {
          if(el._id !== action.payload._id) {
            return el
          } else if(index !== arr.indexOf(action.payload) && el._id === action.payload._id) {
            return el
          }
        })
      }
    }

    case DRAG_ITEM: {
      const filling = [...state.chosenItems].filter(el => el.type !== 'bun');
      const bun = [...state.chosenItems].filter(el => el.type === 'bun');
      filling.splice(action.hoverIndex, 0, filling.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        chosenItems: filling.concat(bun)
      }
    }

    case CLEAR_CONSTRUCTOR: {
      return { ...state, chosenItems: [] }
    }

    default: {
      return state;
    }
  }
}