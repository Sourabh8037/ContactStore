import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import * as actions from "../../store/actions/index";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "../../Constants/Styles";

const Register = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { error, isAuth, history, register } = props;
  const { name, email, password, password2 } = user;
  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
    if (error === "user already exists") {
      props.setAlert(error, "error");
      props.clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuth, history]);
  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      props.setAlert("Please enter all fields", "error");
    } else if (password !== password2) {
      props.setAlert("Passwords do not match", "error");
    } else if (password.length < 6 || password2.length < 6) {
      props.setAlert("Password should contain minimum 6 characters", "warning");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <Container>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
          <Card
            className={classes.cardContactRoot}
            style={{ margin: "4rem auto", padding: "1rem" }}
            raised>
            <Typography align="center" variant="h4">
              Account{" "}
            </Typography>
            <Typography variant="h4" color="primary" align="center">
              Register
            </Typography>
            <CardContent>
              <form onSubmit={onSubmit} className={classes.formContainer}>
                <TextField
                  name="name"
                  fullWidth
                  label="Name"
                  required
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={onChange}
                  type="text"
                />
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  required
                  onChange={onChange}
                  type="text"
                />
                <TextField
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={password}
                  required
                  onChange={onChange}
                  type="password"
                />
                <TextField
                  name="password2"
                  fullWidth
                  label="Confirm password"
                  variant="outlined"
                  margin="normal"
                  required
                  value={password2}
                  onChange={onChange}
                  type="password"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.formButton}
                  size="large"
                  onClick={onSubmit}>
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type, timeout = 5000) =>
      dispatch(actions.setAlert(msg, type, timeout)),
    register: (formData) => dispatch(actions.register(formData)),
    clearError: () => dispatch(actions.clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
