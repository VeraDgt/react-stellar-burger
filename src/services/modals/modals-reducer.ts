import { TOrder } from "../../types";
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, EXTRA_ORDER_REQUEST, EXTRA_ORDER_SUCCESS, EXTRA_ORDER_FAILED, OrderActions } from "./modals-action";

export type TOrderModalState = {
  order: TOrder | null,
  orderRequest: boolean,
  orderFailed: boolean,
  extraOrder: TOrder | null,
  extraOrderRequest: boolean,
  extraOrderFailed: boolean,
}

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,

  extraOrder: null,
  extraOrderRequest: false,
  extraOrderFailed: false,
}

export const orderModalReducer = (state: TOrderModalState = initialState, action: OrderActions): TOrderModalState => {
  switch (action.type) {
    case GET_ORDER: {
      return { ...state, 
        orderRequest: true }
    }

    case GET_ORDER_SUCCESS: {
      return { ...state, 
        orderFailed: false, 
        order: action.order, 
        orderRequest: false };
    }

    case GET_ORDER_FAILED: {
      return { ...state, 
        orderFailed: true, 
        orderRequest: false };
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
};