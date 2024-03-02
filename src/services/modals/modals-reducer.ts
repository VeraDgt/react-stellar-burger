import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, EXTRA_ORDER_REQUEST, EXTRA_ORDER_SUCCESS, EXTRA_ORDER_FAILED, OrderActions } from "./modals-action";

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,

  extraOrder: null,
  extraOrderRequest: false,
  extraOrderFailed: false,
}

export const orderModalReducer = (state = initialState, action: OrderActions) => {
  switch (action.type) {
    case GET_ORDER: {
      return { ...state, 
        orderReqest: true }
    }

    case GET_ORDER_SUCCESS: {
      return { ...state, 
        orderFailed: false, 
        order: action.order, 
        orderReqest: false };
    }

    case GET_ORDER_FAILED: {
      return { ...state, 
        orderFailed: true, 
        orderReqest: false };
    }

    case EXTRA_ORDER_REQUEST: {
      return {
        ...state,
        extraOrderRequest: true,
      }
    }

    case EXTRA_ORDER_SUCCESS: {
      return {
        ...state,
        extraOrder: { ...action.payload  },
        extraOrderRequest: false,
        extraOrderFailed: false,
      }
    }

    case EXTRA_ORDER_FAILED: {
      return {
        ...state,
        extraOrderRequest: false,
        extraOrderFailed: true,
      }
    }

    default: {
      return state;
    }
  }
}