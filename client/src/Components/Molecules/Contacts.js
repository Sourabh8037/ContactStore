import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { connect } from "react-redux";
import useStyles from "../../Constants/Styles";
import { Typography } from "@material-ui/core";
import Spinner from "../Spinner/Spinner";
import * as actions from "../../store/actions/index";

const Contacts = (props) => {
  const classes = useStyles();
  const { contacts, getContacts } = props;
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [getContacts]);
  if (!contacts && !props.loading) {
    return (
      <Typography variant="h4" align="center">
        Please Add a Contact
      </Typography>
    );
  }
  return (
    <React.Fragment>
      {props.loading ? (
        <Spinner></Spinner>
      ) : props.filtered !== null ? (
        <div className={classes.contactsContainer}>
          {props.filtered.map((contact) => (
            <ContactItem contact={contact} key={contact._id} />
          ))}
        </div>
      ) : (
        <div className={classes.contactsContainer}>
          {contacts.map((contact) => (
            <ContactItem contact={contact} key={contact._id} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contact.contacts,
    filtered: state.contact.filtered,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: () => dispatch(actions.getContacts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
