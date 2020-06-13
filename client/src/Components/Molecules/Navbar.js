import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Hidden,
} from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import useStyles from "../../Constants/Styles";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const classes = useStyles();
  const { isAuth, logout, user, clearContacts } = props;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <React.Fragment>
      <Typography
        display="inline"
        variant="h5"
        style={{ color: "#fff" }}
        className={classes.flexGrow1}>
        Hello {user ? user.name : null}
      </Typography>
      <Button color="inherit" className={classes.navLink} onClick={onLogout}>
        Logout
      </Button>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <Button color="inherit">
        <NavLink to="/login" className={classes.navLink}>
          Login
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to="/register" className={classes.navLink}>
          Register
        </NavLink>
      </Button>
    </React.Fragment>
  );

  return (
    <div className={classes.flexGrow1}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <ContactsIcon />
          </IconButton>
          <Hidden smDown>
            <Typography variant="h6" className={classes.flexGrow1}>
              {props.title}
            </Typography>
          </Hidden>
          {isAuth ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type, timeout = 5000) =>
      dispatch(actions.setAlert(msg, type, timeout)),
    logout: (formData) => dispatch(actions.logout(formData)),
    clearError: () => dispatch(actions.clearErrors()),
    clearContacts: () => dispatch(actions.clearContacts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
