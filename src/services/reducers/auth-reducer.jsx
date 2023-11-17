import { 
  SET_AUTH_CHECKED, 
  SET_USER, 
  LOGIN,
  REGISTER,
  REGISTER_FAILED, 
  REGISTER_SUCCESS,
  } from '../actions/auth';

const initialState = {
    user: null,
    isAuthChecked: false,
    resisterSuccess: false,
    registerFailed: false,
    loginRequest: false,
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGIN: 
      return { 
        ...state, 
        loginRequest: true
      }
    case REGISTER: 
      return { 
        ...state, 
        registerSuccess: true
      }
    
    case REGISTER_SUCCESS: 
      return { 
        ...state,
        registerFailed: false,
        registerSuccess: false,  
        user: action.payload
      }
    
    case REGISTER_FAILED: 
      return { 
        ...state, 
        registerFailed: false, 
        registerSuccess: true
      }
      
    default:
      return state;    
  }
};
