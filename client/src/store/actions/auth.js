import * as actionTypes from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";

const registerSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    user: data,
  };
};

const registerFail = (err) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: err,
  };
};

export const loadUser = () => {
  return (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    axios
      .get("/api/auth")
      .then((res) => {
        dispatch({ type: actionTypes.USER_LOADED, data: res.data });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AUTH_ERROR,
          error: err.response.data.msg,
        });
      });
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};

export const register = (formData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post("/api/users", formData, config)
      .then((res) => {
        dispatch(registerSuccess(res.data));
        loadUser();
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data.msg));
      });
  };
};

// login user
export const login = (formData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post("/api/auth", formData, config)
      .then((res) => {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, user: res.data });
        loadUser();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          error: err,
        });
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
