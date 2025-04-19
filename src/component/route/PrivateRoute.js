import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ loginCheck, loading, children }) => {
  if (loading || loginCheck === null) {
    return null; // 아직 판단 중
  }

  return loginCheck ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
