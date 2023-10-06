import { isAction } from "@reduxjs/toolkit";
import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, ADD_ITEM_DATA, DELETE_ITEM_DATA } from "../actions/modals";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  currItem: {}
}

export const itemModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_DATA: {
      return {
        ...state,
        currItem: action.payload
      }
    }

    case DELETE_ITEM_DATA: {
      return {
        ...state,
        currItem: {}
      }
    }

    default: {
      return state;
    }
  }
}

export const orderModalReducer = (state = initialState, ation) => {
  switch (isAction.type) {
    case GET_ORDER: {
      return { ...state, orderReqest: true }
    }

    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, order: isAction.order, orderReqest: false };
    }

    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderReqest: false };
    }

    default: {
      return state;
    }
  }
}