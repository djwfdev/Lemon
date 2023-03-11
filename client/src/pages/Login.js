/* Cards to send user to the apprproate page */

import React from "react";
import "../App.css";
import LoginCards from "../components/LoginCards";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <>
      <LoginCards />
      <Footer />
    </>
  );
};

export default Login;
