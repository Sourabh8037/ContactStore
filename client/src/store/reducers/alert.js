import * as actionTypes from "../actions/actionTypes";

const initialState = [];

// Methods

const setAlert = (state, action) => {
  return [...state, action.alert];
};
const removeAlert = (state, action) => {
  return state.filter((alert) => alert.id !== action.id);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return setAlert(state, action);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
};
export default reducer;
