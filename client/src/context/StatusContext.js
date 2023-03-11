/* This handles the status of the user's logged in status */    

import React, { createContext, useState } from "react";

const StatusContext = createContext({
    status: false,
    handlestatus: () => {},
});

const StatusContextProvider = ({ children }) => {
    const [status, setstatus] = useState(false);
    const handlestatus = (value) => {
        setstatus(value);
    };
    return (
        <StatusContext.Provider value={{ status, handlestatus }}>
            {children}
        </StatusContext.Provider>
    );
};

export { StatusContext, StatusContextProvider };