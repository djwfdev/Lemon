import { createContext } from 'react';

// authentication base values
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => { },
    logout: () => { }
});