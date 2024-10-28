import React from 'react';
import { Navigate } from 'react-router-dom';

const getRole = () => {
    const userdata = localStorage.getItem('role');
    return userdata;
};

const RoleRoute = ({ children, allowedRoles }) => {
    const role = getRole();
    return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default RoleRoute;