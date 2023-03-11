import React from "react";
import Footer from "../components/Footer";
import { Redirect } from "react-router-dom";
import Account from "../components/account/Account";
import Receipts from "../components/Receipts";

const MotoristDashboard = () => {
    const user = JSON.parse(sessionStorage.getItem("member"));

    // if user is not logged in as an subscribed member, redirect home 
    return (
        <>
            {!user ? <Redirect to="/"></Redirect> :
                <>
                    <Account />
                    <Receipts />
                </>
            }
            <Footer />
        </>
    );
};

export default MotoristDashboard;
