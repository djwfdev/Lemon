/* Cards to send user to the apprproate page */

import React from "react";
import "../App.css";
import SignUpCards from "../components/SignUpCards";
import Footer from "../components/Footer";

const SignUp = () => {
    return (
        <>
            <SignUpCards />
            <Footer />
        </>
    );
};

export default SignUp;
