import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    function insertUserToken(tkn) {
        setToken(tkn);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, insertUserToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
