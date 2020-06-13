import React from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import * as actions from "../../store/actions/index";
import useStyles from "../../Constants/Styles";

const ContactFilter = (props) => {
  const { text } = props;
  const classes = useStyles();

  const onChange = (e) => {
    props.setText(e.target.value);
    if (e.target.value !== "") {
      props.filterContact();
    } else {
      console.log("clearrFilter");

      props.clearFilter();
    }
  };

  return (
    <form className={classes.formContainer}>
      <TextField
        ref={text}
        placeholder="Fitler Contacts..."
        type="text"
        value={text}
        onChange={onChange}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    filtered: state.contact.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterContact: () => dispatch(actions.filterContact()),
    clearFilter: () => dispatch(actions.clearFilter()),
    setText: (text) => dispatch(actions.setText(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactFilter);
