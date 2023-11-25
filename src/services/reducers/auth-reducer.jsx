import { 
  SET_AUTH_CHECKED, 
  SET_USER, 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED, 
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILED,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  } from '../actions/auth';

const initialState = {
    user: null,
    isAuthChecked: false,
    resisterSuccess: false,
    registerFailed: false,
    loginRequest: false,
    recoverPwRequest: false,
    recoverPwFailed: false,
    updateUserRequest: false,
    updateUserFailed: false,
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

    case LOGIN_SUCCESS: 
      return { 
        ...state, 
        user: action.payload, 
        loginRequest: false, 
        loginFailed: false
      }

    case LOGIN_FAILED:
      return { 
        ...state, 
        loginRequest: false, 
        loginFailed: true
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

      case RECOVER_PASSWORD: 
        return { 
          ...state, 
          recoverPwRequest: true 
        }

      case RECOVER_PASSWORD_SUCCESS: 
        return { 
          ...state, 
          user: { ...state.user, email: action.payload }, 
          recoverPwRequest: false, 
          recoverPwFailed: false 
        }

      case RECOVER_PASSWORD_FAILED: 
        return { 
          ...state, 
          recoverPwRequest: false, 
          recoverPwFailed: true 
        }

      case UPDATE_USER:
        return { 
          ...state, 
          updateUserRequest: true 
        }

      case UPDATE_USER_SUCCESS:
        return { 
          ...state, 
          user: action.payload, 
          updateUserFailed: false, 
          updateUserRequest: false
        }

      case UPDATE_USER_FAILED:
        return { 
          ...state, 
          updateUserFailed: true, 
          updateUserRequest: false 
        }
      
    default:
      return state;    
  }
};
