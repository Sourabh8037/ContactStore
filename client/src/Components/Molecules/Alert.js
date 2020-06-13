import React from "react";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import useStyles from "../../Constants/Styles";

const AlertComponent = (props) => {
  const classes = useStyles();
  return (
    props.alerts.length > 0 &&
    props.alerts.map((alert) => {
      return (
        <Alert
          className={classes.formContainer}
          severity={alert.type}
          key={alert.msg}
          variant="outlined">
          <AlertTitle>
            {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
          </AlertTitle>
          {alert.msg}
        </Alert>
      );
    })
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

export default connect(mapStateToProps)(AlertComponent);
