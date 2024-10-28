// import { Outlet, Navigate } from 'react-router-dom';

// export default function PrivateRoutes() {
//     const authToken = localStorage.getItem('token');

//     // Check if the token is missing or if the user is not an admin, then redirect to login
//     if (!authToken) {
//         return <Navigate to="/login" />;
//     }
    
//     return <Outlet />;
// }

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function PrivateRoutes() {
    const authToken = localStorage.getItem('token');

    // if (!authToken) {
    //     return <Navigate to="/login" />;
    // }

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // current time in seconds
            return decodedToken.exp < currentTime;
        } catch (e) {
            return true; // If there's an error decoding the token, consider it invalid/expired
        }
    };

    // if (isTokenExpired(authToken)) {
    //     localStorage.removeItem('authToken'); // Remove expired token
    //     return <Navigate to="/login" />;
    // }

    return <Outlet />;
}