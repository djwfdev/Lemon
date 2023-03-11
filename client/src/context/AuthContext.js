/* To control whether the user is authenticated or not we make use of the context provider.
This can be used globally across the app */ 

import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isAuth: false,
  userType: '',
  login: () => {},
  logout: () => {},
  checkIsLoggedIn: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [userType, setUserType] = useState();

  const checkIsLoggedIn = () => {
    if (sessionStorage.getItem('member')){
      setisAuth(true);
      setUserType('member');
    }
    else if (sessionStorage.getItem('ap')){
      setisAuth(true);
      setUserType('ap');
    }
    else 
      setisAuth(false); 
  };
  
  const login = () => {
    checkIsLoggedIn(); 
    setisAuth(true); 
  };

  const logout = () => {
    setisAuth(false); 
    sessionStorage.removeItem(userType); 
  };

  return (
    <AuthContext.Provider value={{ isAuth, userType, login, logout, checkIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };