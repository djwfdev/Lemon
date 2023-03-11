import React from "react";
import Footer from "../components/Footer";
import { Redirect } from "react-router-dom";
import Account from "../components/account/Account";
import AvailableJobs from "../components/AvailableJobs";

const APDashboard = () => {
    const user = JSON.parse(sessionStorage.getItem("ap"));

    // if user is not logged in as an AP, redirect home 
    return (
        <>
            {!user ? <Redirect to="/"></Redirect> : 
            <>
                <Account />
                <AvailableJobs />
            </>}
            <Footer />
        </>
    );
};

export default APDashboard; 