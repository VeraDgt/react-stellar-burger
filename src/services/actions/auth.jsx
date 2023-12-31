import { api } from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/utils";
import { cookieLive } from "../../utils/data";

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


function loginFailed() {
  return { type: LOGIN_FAILED };
}

function setUserFailed() {
  return { type: SET_USER_FAILED }
}

function logoutFailed() {
    return { type: LOGOUT_FAILED };
}

function registerFailed() {
  return { type: REGISTER_FAILED };
}

function recoverPwFailed() {
  return { type: RECOVER_PASSWORD_FAILED};
}

function refreshTokenFalied() {
  return { type: REFRESH_TOKEN_FAILED };
}

function updateUserFailed() {
  return { type: UPDATE_USER_FAILED};
}

function resetPasswordFailed() {
  return { type: RESET_PASSWORD_FAILED};
}

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    dispatch({type: GET_USER});
    return api.getUser().then((res) => {
      if (res && res.success) {
      dispatch(setUser(res.user));
    } else {
      dispatch(setUserFailed())
    }
    if(res.message === 'jwt expired' || (getCookie('refreshToken') && !getCookie('accessToken'))) {
      dispatch(checkToken());
    }
  })
  .catch(err => {
    console.log(err);
    dispatch(setUserFailed())
  })
  }
};

export const login = (form) => (dispatch) => {
  dispatch({type: LOGIN});

  api.login(form).then(res => {
    if (res && res.success) {      
      setCookie('accessToken', res.accessToken, {expires: cookieLive});
      setCookie('refreshToken', res.refreshToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user
      })
    } else {
      dispatch(loginFailed())
    }
  })
  .catch(err => {
    console.log(err);
    dispatch(loginFailed())
  })
};

export const register = (form) => (dispatch) => {
  dispatch({type: REGISTER});

  api.register(form).then(res => {
    if (res && res.success) {

    setCookie('accessToken', res.accessToken, { expires: cookieLive });
    setCookie('refreshToken', res.refreshToken);
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res
    })
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
    return (dispatch) => {
        if (getCookie("accessToken")) {
            dispatch(getUser())
              .catch(() => {
                  deleteCookie("accessToken");
                  deleteCookie("refreshToken");
                  dispatch(setUser(null));
              })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const recoverPassword = (email) => {
  return function (dispatch) {
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
  return function (dispatch) {
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

export const updateUser = (form) => {
  return function(dispatch) {
    dispatch({type: UPDATE_USER});

    api.updateUser(form).then(res => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user
        })
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

export const resetPassword = (form) => {
  return function(dispatch) {
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
  return (dispatch) => {
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