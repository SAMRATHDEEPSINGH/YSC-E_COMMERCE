import React from 'react';
import { Navigate } from 'react-router-dom';

const ConditionalRedirect = ({ user }) => {
  if (user) {
    return <Navigate to='/' replace={true} />;
  }
  return null;
};

export default ConditionalRedirect;
