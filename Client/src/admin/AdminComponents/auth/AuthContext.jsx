import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const value = { user, setUser, login };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
};



