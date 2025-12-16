import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    // Helper to set user state directly (used by Registration/StudentLogin)
    const login = (userData) => {
        const { token, ...user } = userData;
        localStorage.setItem('token', token || userData.token); // Handle generic nesting

        // If userData has token mixed in, clean it or just store it. 
        // Our backend returns { _id, name, email, role, token }.

        const userToSave = {
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role
        };

        localStorage.setItem('user', JSON.stringify(userToSave));
        setUser(userToSave);
    };

    // Helper to perform API login (used by AdminLogin)
    const loginWithCredentials = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { loginId: email, password }); // Updated to loginId for consistency
            login(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithCredentials, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
