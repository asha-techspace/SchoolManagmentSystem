import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom';

// HOC to protect routes based on user role
const RoleProtectedRoute = ({ element, roles }) => {
    const { userInfo } = useSelector((state) => state.auth);
    console.log(`userInfo:: ${userInfo}`)
    console.log(`element:: ${element}`)

    if (!userInfo) {
        return <Navigate to="/" />;
    }

    if (!roles.includes(userInfo.role)) {
        return <Navigate  to="/unauthorized" />; // Redirect to unauthorized page if role doesn't match
    }

    return element; // Render component if user role is allowed
};

export default RoleProtectedRoute;
