import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const AuthenticateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = () => {
    const UserDetails = JSON.parse(localStorage.getItem('UserDetails'));
    if (UserDetails) {
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthenticateRoute;
