import * as actionTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export const startAlert = (msg, type, id) => {
  return {
    type: actionTypes.SET_ALERT,
    alert: {
      msg,
      type,
      id,
    },
  };
};

export const removeAlert = (id) => {
  return {
    type: actionTypes.REMOVE_ALERT,
    id,
  };
};

export const setAlert = (msg, type, timeout = 5000) => {
  return (dispatch) => {
    const id = uuidv4();
    dispatch(startAlert(msg, type, id));
    setTimeout(() => {
      dispatch(removeAlert(id));
    }, timeout);
  };
};
