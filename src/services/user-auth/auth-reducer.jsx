import { 
  SET_AUTH_CHECKED, 
  GET_USER,
  SET_USER, 
  SET_USER_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED, 
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
  } from './auth-action';

const initialState = {
    user: null,
    recoverEmail: null,
    isAuthChecked: false,
    getUserRequest: false,
    setUserFailed: false,
    registerSuccess: false,
    registerFailed: false,
    loginRequest: false,
    recoverPwRequest: false,
    recoverPwFailed: false,
    recoverPwSuccess: false,
    updateUserRequest: false,
    updateUserFailed: false,
    refreshTokenRequest: false,
    refreshTokenFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }

    case GET_USER: 
      return {
        ...state, 
        getUserRequest: true
      }

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
        setUserFailed: false
      }

    case SET_USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        setUserFailed: true
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
          recoverPwRequest: true,
          recoverPwSuccess: false, 
        }

      case RECOVER_PASSWORD_SUCCESS: 
        return { 
          ...state, 
          recoverEmail: action.payload, 
          recoverPwRequest: false, 
          recoverPwFailed: false,
          recoverPwSuccess: true, 
        }

      case RECOVER_PASSWORD_FAILED: 
        return { 
          ...state, 
          recoverPwRequest: false, 
          recoverPwFailed: true,
          recoverPwSuccess: false 
        }

      case RESET_PASSWORD: 
        return { 
          ...state, 
          resetPasswordRequest: true
        }

      case RESET_PASSWORD_SUCCESS: 
        return { 
          ...state, 
          resetPasswordRequest: false, 
          resetPasswordFailed: false 
        }

      case RESET_PASSWORD_FAILED: 
        return { 
          ...state, 
          resetPasswordRequest: false, 
          resetPasswordFailed: true 
        }

      case REFRESH_TOKEN: 
        return { 
          ...state, 
          refreshTokenRequest: true 
        }

      case REFRESH_TOKEN_SUCCESS: 
        return { 
          ...state, 
          refreshTokenRequest: false, 
          refreshTokenFailed: false 
        }

      case REFRESH_TOKEN_FAILED: 
        return { 
          ...state, 
          refreshTokenRequest: false, 
          refreshTokenFailed: true 
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
