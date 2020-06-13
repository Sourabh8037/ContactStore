import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// Components
import Navbar from "./Components/Molecules/Navbar";
import Home from "./Containers/HomePage";
import About from "./Containers/About";
import Register from "./Components/Molecules/Register";
import Login from "./Components/Molecules/Login";
import Alerts from "./Components/Molecules/Alert";
import PrivateRoute from "./Components/Routing/PrivateRoute";

// Material UI
import { Container } from "@material-ui/core";
import setAuthToken from "./Utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  return (
    <React.Fragment>
      <Navbar title="Contact Store" />
      <Container>
        <Alerts />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/about" exact component={About} />
          <PrivateRoute path="/" component={Home}></PrivateRoute>
        </Switch>
      </Container>
    </React.Fragment>
  );
};
export default App;
