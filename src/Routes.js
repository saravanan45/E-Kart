import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Checkout from './Checkout';
import OrderPlaced from './OrderPlaced';
import ViewOrders from './ViewOrders';
import AuthenticateRoute from './AuthenticateRoute/index';

function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <AuthenticateRoute path="/Checkout" component={Checkout} />
      <AuthenticateRoute path="/Success" component={OrderPlaced} />
      <AuthenticateRoute path="/ViewOrders" component={ViewOrders} />
    </Router>
  );
}

export default Routes;
