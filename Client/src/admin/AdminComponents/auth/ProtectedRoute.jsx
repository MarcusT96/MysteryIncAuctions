import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || !user.isAdmin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
