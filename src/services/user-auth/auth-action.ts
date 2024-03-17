import { api } from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/utils";
import { cookieLive } from "../../utils/data";
import { TUser } from "../../types";
import { AppDispatch, AppThunk } from "../..";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

type TSetAuthChecked = {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean,
}

type TGetUser = {
  type: typeof GET_USER,
}

export type TSetUser = {
  type: typeof SET_USER,
  payload?: TUser | null,
}

type TSetUserFailed = {
  type: typeof SET_USER_FAILED,
}

type TLogin = {
  type: typeof LOGIN,
}

type TLoginSuccess = {
  type: typeof LOGIN_SUCCESS,
  payload: TUser,
}

type TLoginFailed = {
  type: typeof LOGIN_FAILED,
}

type TLogout = {
  type: typeof LOGOUT,
}

type TLogoutSuccess = {
  type: typeof LOGOUT_SUCCESS,
}

type TLogoutFailed = {
  type: typeof LOGOUT_FAILED,
}

type TRegister = {
  type: typeof REGISTER,
}

type TRegisterSuccess = {
  type: typeof REGISTER_SUCCESS,
  payload: TUser
}

type TRegisterFailed = {
  type: typeof REGISTER_FAILED,
}

type TRecoverPassword = {
  type: typeof RECOVER_PASSWORD,
}

type TRecoverPasswordSuccess = {
  type: typeof RECOVER_PASSWORD_SUCCESS,
  payload: string,
}

type TRecoverPasswordFailed = {
  type: typeof RECOVER_PASSWORD_FAILED,
}

type TRefreshToken = {
  type: typeof REFRESH_TOKEN,
}

type TRefreshTokenSuccess = {
  type: typeof REFRESH_TOKEN_SUCCESS,
}

type TRefreshTokenFailed = {
  type: typeof REFRESH_TOKEN_FAILED,
}

type TUpdateUser = {
  type: typeof UPDATE_USER,
}

type TUpdateUserSuccess = {
  type: typeof UPDATE_USER_SUCCESS,
  payload: TUser,
}

type TUpdateUserFailed = {
  type: typeof UPDATE_USER_FAILED,
}

type TResetPassword = {
  type: typeof RESET_PASSWORD,
}

type TResetPasswordSuccess = {
  type: typeof RESET_PASSWORD_SUCCESS,
}

type TResetPasswordFailed = {
  type: typeof RESET_PASSWORD_FAILED,
}

export type TUserActions = 
| TSetAuthChecked | TGetUser | TSetUser | TSetUserFailed
| TLogin | TLoginSuccess | TLoginFailed
| TLogout | TLogoutSuccess | TLogoutFailed
| TRegister | TRegisterSuccess | TRegisterFailed
| TRecoverPassword | TRecoverPasswordSuccess | TRecoverPasswordFailed
| TRefreshToken | TRefreshTokenSuccess | TRefreshTokenFailed 
| TUpdateUser | TUpdateUserSuccess | TUpdateUserFailed 
| TResetPassword | TResetPasswordSuccess | TResetPasswordFailed;

function loginFailed(): TLoginFailed {
  return { type: LOGIN_FAILED };
}

function setUserFailed(): TSetUserFailed {
  return { type: SET_USER_FAILED }
}

function logoutFailed(): TLogoutFailed {
    return { type: LOGOUT_FAILED };
}

function registerFailed(): TRegisterFailed {
  return { type: REGISTER_FAILED };
}

function recoverPwFailed(): TRecoverPasswordFailed {
  return { type: RECOVER_PASSWORD_FAILED};
}

function refreshTokenFalied(): TRefreshTokenFailed {
  return { type: REFRESH_TOKEN_FAILED };
}

function updateUserFailed(): TUpdateUserFailed {
  return { type: UPDATE_USER_FAILED};
}

function resetPasswordFailed(): TResetPasswordFailed {
  return { type: RESET_PASSWORD_FAILED};
}

export const setAuthChecked = (value: boolean): TSetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | undefined | null ): TSetUser => ({
  type: SET_USER,
  payload: user,
});

export const getUser = ():AppThunk<Promise<unknown>>  => {
  return (dispatch: AppDispatch & AppThunk) => {
    dispatch({type: GET_USER});
    return api.getUser().then((res) => {
      if (res && res.success) {
      dispatch(setUser(res.user));
    } else {
      dispatch(setUserFailed())
    }
  })
  .catch(err => {
    console.log(err);
    if(err.message === 'jwt expired') {
      dispatch(checkToken());
    }
    dispatch(setUserFailed())
  })
  }
};

const loginSuccess = (payload: TUser | any): TLoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
})

export const login = (form: { email: string, password: string}) => (dispatch: AppDispatch) => {
  dispatch({type: LOGIN});

  api.login(form).then(res => {
    if (res && res.success) {      
      setCookie('accessToken', res.accessToken, {expires: cookieLive});
      setCookie('refreshToken', res.refreshToken);
      dispatch(loginSuccess(res.user));
    } else {
      dispatch(loginFailed())
    }
  })
  .catch(err => {
    console.log(err);
    dispatch(loginFailed())
  })
};

const registerSuccess = (payload: TUser | any): TRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  payload,
})

export const register = (form: TUser) => (dispatch: AppDispatch) => {
  dispatch({type: REGISTER});

  api.register(form).then(res => {
    if (res && res.success) {

    setCookie('accessToken', res.accessToken, { expires: cookieLive });
    setCookie('refreshToken', res.refreshToken);
    dispatch(registerSuccess(res));
    } else {
      dispatch(registerFailed())
    }
  })
  .catch(err => {
    console.log(err);
    dispatch(registerFailed())
  })
}

export const checkUserAuth = () => {
  return (dispatch: AppDispatch & AppThunk) => {
    if (getCookie("accessToken") !== 'false') {
      api.getUser().then((res) => {
        if (res && res.success) {
        dispatch(setUser(res.user));
      } else {
        dispatch(setUserFailed())
      }})
        .catch(() => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(setUser(null));
      })
      .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    };
  };
};

export const recoverPassword = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({type: RECOVER_PASSWORD});

    api.recoverPassword(email).then(res => {
      if (res && res.success) {
        dispatch({
          type: RECOVER_PASSWORD_SUCCESS,
          payload: email
        })
      } else {
        dispatch(recoverPwFailed())
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(recoverPwFailed)
    })
  }
}

export const checkToken = () => {
  return function (dispatch: AppDispatch) {
    dispatch({type: REFRESH_TOKEN});

    api.getToken().then(res => {
      if (res && res.success) {
        setCookie('accessToken', res.accessToken, { expires: cookieLive });
        setCookie('refreshToken', res.refreshToken);
        dispatch({
        type: REFRESH_TOKEN_SUCCESS
        })
      } else {
        dispatch(refreshTokenFalied())
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(refreshTokenFalied())
    })
  }
}

const updateUserSuccess = (payload: TUser | any): TUpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS,
  payload,
})

export const updateUser = (form: TUser) => {
  return function(dispatch: AppDispatch & AppThunk) {
    dispatch({type: UPDATE_USER});

    api.updateUser(form).then(res => {
      if (res && res.success) {
        dispatch(updateUserSuccess(res.user));
      } else {
        dispatch(updateUserFailed())
      }
      if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
        dispatch(checkToken());
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(updateUserFailed());
    })
  }
}

export const resetPassword = (form: { password: string, token: string }) => {
  return function(dispatch: AppDispatch) {
    dispatch({type: RESET_PASSWORD});

    api.resetPassword(form).then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        })
      } else {
        dispatch(resetPasswordFailed());
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(resetPasswordFailed());
    })
  }
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    return api.logout().then(() => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      dispatch(setUser(null));
    })
    .catch(err => {
      console.log(err);
      dispatch(logoutFailed());
    })
  }
};