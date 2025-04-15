// src/component/route/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, loginCheck}) => {
 

  if (!loginCheck) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
