import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from 'usecontext/ContextProvider';

const getToken = () => {
  return localStorage.getItem('token');
};

const AuthRoute = ({ children }) => {
  const { role } = useContext(Context);

  const token = getToken();

  if (!token) {
    if (role === 'reseller' || role === 'lco') {
      return <Navigate to="/reseller/login" />;
    } else {
      return <Navigate to="/auth/login" />;
    }
  }

  return children;
};

export default AuthRoute;