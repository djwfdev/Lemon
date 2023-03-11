import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";
import { StatusContextProvider } from "./context/StatusContext";

ReactDOM.render(
  <React.StrictMode>
    <StatusContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StatusContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
