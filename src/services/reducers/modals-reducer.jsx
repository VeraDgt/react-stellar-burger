import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../actions/modals";

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false
}

export const orderModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return { ...state, orderReqest: true }
    }

    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, order: action.order, orderReqest: false };
    }

    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderReqest: false };
    }

    default: {
      return state;
    }
  }
}