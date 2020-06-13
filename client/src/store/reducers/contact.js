import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/updateObj";

const initialState = {
  contacts: null,
  current: null,
  filtered: null,
  text: "",
  error: null,
};

const addContact = (state, action) => {
  return updateObject(state, { contacts: [action.contact, ...state.contacts] });
};

const deleteContact = (state, action) => {
  const contacts = state.contacts.filter(
    (item, index) => item._id !== action._id
  );
  let filtered = state.filtered
    ? state.filtered.filter((item, index) => item._id !== action._id)
    : null;
  return updateObject(state, { contacts: contacts, filtered: filtered });
};

const setCurrentContact = (state, action) => {
  return updateObject(state, { current: action.contact });
};

const clearCurrent = (state, action) => {
  return updateObject(state, { current: null });
};

const updateContact = (state, action) => {
  const contacts = state.contacts.map((contact) =>
    contact._id === action.contact._id ? action.contact : contact
  );
  const filtered = state.filtered
    ? state.filtered.map((contact) =>
        contact._id === action.contact._id ? action.contact : contact
      )
    : null;
  return updateObject(state, {
    contacts: contacts,
    filtered: filtered,
    loading: false,
  });
};

const filterContact = (state, action) => {
  return {
    ...state,
    filtered: state.contacts.filter((contact) => {
      const regex = new RegExp(`${state.text}`, "gi");
      return contact.name.match(regex) || contact.email.match(regex);
    }),
  };
};

const clearFilter = (state, action) => {
  console.log("inReducer");
  return updateObject(state, { filtered: null, loading: false });
};

const getContacts = (state, action) => {
  return updateObject(state, { contacts: action.contacts, loading: false });
};

const clearContacts = (state, action) => {
  return updateObject(state, {
    contacts: null,
    filtered: null,
    current: null,
    error: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTACTS:
      return getContacts(state, action);
    case actionTypes.ADD_CONTACT:
      return addContact(state, action);
    case actionTypes.DELETE_CONTACT:
      return deleteContact(state, action);
    case actionTypes.SET_CURRENT:
      return setCurrentContact(state, action);
    case actionTypes.UPDATE_CONTACT:
      return updateContact(state, action);
    case actionTypes.CLEAR_CURRENT:
      return clearCurrent(state, action);
    case actionTypes.FILTER_CONTACT:
      return filterContact(state, action);
    case actionTypes.CLEAR_FILTER:
      return clearFilter(state, action);
    case actionTypes.SET_TEXT:
      return updateObject(state, { text: action.text });
    case actionTypes.CONTACT_ERROR:
      return updateObject(state, { error: action.error });
    case actionTypes.CLEAR_CONTACTS:
      return clearContacts(state, action);
    default:
      return state;
  }
};
export default reducer;
