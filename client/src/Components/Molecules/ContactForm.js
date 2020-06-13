import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  Typography,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from "@material-ui/core";

import useStyles from "../../Constants/Styles";

const ContactForm = (props) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const classes = useStyles();

  useEffect(() => {
    if (props.current) {
      setContact(props.current);
      console.log("setting current");
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
    // eslint-disable-next-line
  }, [props.current]);

  const { name, email, phone, type } = contact;
  const onChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (props.current) {
      props.updateContact(contact);
      props.clearContact();
    } else {
      props.addContact(contact);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const onClear = () => {
    props.clearContact();
  };

  return (
    <form className={classes.my1xauto} onSubmit={onSubmit}>
      <Typography variant="h5" align="center">
        {props.current ? "Update Contact" : "Add Contact"}
      </Typography>
      <TextField
        label="Name"
        fullWidth
        name="name"
        variant="outlined"
        margin="normal"
        onChange={onChange}
        value={name}
      />
      <TextField
        label="Email"
        fullWidth
        name="email"
        variant="outlined"
        margin="normal"
        onChange={onChange}
        value={email}
      />
      <TextField
        label="Phone"
        fullWidth
        name="phone"
        variant="outlined"
        margin="normal"
        onChange={onChange}
        value={phone}
      />
      <FormControl component="fieldset" className={classes.my1xauto}>
        <FormLabel component="legend">Contact Type</FormLabel>
        <RadioGroup value={type} name="type" row onChange={onChange}>
          <FormControlLabel
            value="personal"
            control={<Radio color="primary" />}
            label="Personal"
          />
          <FormControlLabel
            value="professional"
            control={<Radio color="primary" />}
            label="Professional"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onSubmit}
        className={classes.submitButton}>
        {props.current ? "Update" : "Submit"}
      </Button>
      {props.current && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onClear}
          className={classes.submitButton}>
          Clear
        </Button>
      )}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.contact.current,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(actions.addContact(contact)),
    updateContact: (contact) => dispatch(actions.updateContact(contact)),
    clearContact: () => dispatch(actions.clearCurrentContact()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
