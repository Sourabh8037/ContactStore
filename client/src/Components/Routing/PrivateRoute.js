import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { isAuth, loading } = props;
  const Component = props.component;
  return (
    <Route
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
