import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, path, children }) => (loggedIn ? <Route path={path}>{children}</Route> : <Redirect to="/signin" />);

export default ProtectedRoute;
