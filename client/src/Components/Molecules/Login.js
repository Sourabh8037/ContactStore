import React, { useState, useEffect } from "react";
import * as actions from "../../store/actions/index";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import useStyles from "../../Constants/Styles";
import { connect } from "react-redux";

const Login = (props) => {
  const { error, isAuth, history, login, setAlert } = props;
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
    if (error === "Invalid credentials") {
      props.setAlert(error, "error");
      props.clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuth, history]);
  const { email, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "error");
    } else if (password.length < 6) {
      setAlert("Password is minimum six characters", "error");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Container>
      <AnimatePresence>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          exit={{ x: "100%" }}>
          <Card
            className={classes.cardContactRoot}
            style={{ margin: "4rem auto", padding: "1rem" }}
            raised>
            <Typography variant="h4" align="center">
              Account{" "}
            </Typography>
            <Typography variant="h4" align="center" color="primary">
              Login
            </Typography>
            <CardContent>
              <form onSubmit={onSubmit} className={classes.formContainer}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={onChange}
                  type="text"
                />
                <TextField
                  name="password"
                  label="Password"
                  fullWidth
                  required
                  variant="outlined"
                  margin="normal"
                  value={password}
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
                  Log In
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
    login: (formData) => dispatch(actions.login(formData)),
    clearError: () => dispatch(actions.clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
