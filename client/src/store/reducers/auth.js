import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/updateObj";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: null,
  loading: true,
  error: null,
};

// Methods

// Load User
const registerUser = (state, action) => {
  localStorage.setItem("token", action.user.token);
  return {
    ...state,
    ...action.user,
    isAuth: true,
    loading: false,
  };
};

const registerFail = (state, action) => {
  return {
    ...state,
    token: null,
    isAuth: false,
    loading: false,
    user: null,
    error: action.error,
  };
};

//Register User

// Logout

// Login User

// Clear Errors
// const clearErrors = (state, action) => {
//   return updateObject(state, { error: null });
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADED:
      return updateObject(state, {
        isAuth: true,
        loading: false,
        user: action.data,
      });
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return registerUser(state, action);
    case actionTypes.LOGOUT:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.AUTH_ERROR:
    case actionTypes.REGISTER_FAIL:
      localStorage.removeItem("token");
      return registerFail(state, action);
    default:
      return state;
  }
};
export default reducer;
