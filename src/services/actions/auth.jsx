import { api } from "../../utils/api";
import { getCookie, setCookie, deleteCookie } from "../../utils/utils";
import { cookieLive } from "../../utils/data";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

function loginFailed() {
  return { type: LOGIN_FAILED }
}

function registerFailed() {
  return { type: REGISTER_FAILED }
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
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
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
    setCookie('accessToken', res.accessToken, { expires: 1200 });
    setCookie('refreshToken', res.refreshToken);
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res
    })
  })

}

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser(null));
              })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = () => {
  return (dispatch) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};