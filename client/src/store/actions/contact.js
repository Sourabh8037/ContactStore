import * as actionTypes from "./actionTypes";
import axios from "axios";

export const updateContact = (contact) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`/api/contacts/${contact._id}`, contact, config)
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_CONTACT, contact: res.data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CONTACT_ERROR, error: err.response.msg });
      });
  };
};

export const getContacts = () => {
  return (dispatch) => {
    axios
      .get("/api/contacts")
      .then((res) => {
        dispatch({ type: actionTypes.GET_CONTACTS, contacts: res.data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CONTACT_ERROR, error: err.response.msg });
      });
  };
};

export const addContact = (contact) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/contacts", contact, config)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_CONTACT, contact: res.data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CONTACT_ERROR, error: err.response.msg });
      });
  };
};
export const deleteContact = (_id) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(`/api/contacts/${_id}`)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_CONTACT, _id: _id });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.CONTACT_ERROR, error: err.response.msg });
      });
  };
};
export const setCurrentContact = (contact) => {
  return {
    type: actionTypes.SET_CURRENT,
    contact: contact,
  };
};
export const clearCurrentContact = () => {
  return {
    type: actionTypes.CLEAR_CURRENT,
  };
};

export const setText = (text) => {
  return {
    type: actionTypes.SET_TEXT,
    text: text,
  };
};

export const filterContact = () => {
  return {
    type: actionTypes.FILTER_CONTACT,
  };
};

export const clearFilter = () => {
  return {
    type: actionTypes.CLEAR_FILTER,
  };
};

export const clearContacts = () => {
  return {
    type: actionTypes.CLEAR_CONTACTS,
  };
};
