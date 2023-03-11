import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RequestService from "./pages/RequestService";
import RequestServiceConfirmation from "./pages/RequestServiceConfirmation";
import RequestServiceResult from "./pages/RequestServiceResult";
import ServiceReceipt from "./pages/ServiceReceipt";
import Login from "./pages/Login";
import LoginMotorist from "./pages/LoginMotorist";
import LoginAP from "./pages/LoginAP";
import SignUp from "./pages/SignUp";
import SignUpMotorist from "./pages/SignUpMotorist";
import SignUpAP from "./pages/SignUpAP";
import ServiceRequestMember from "./pages/ServiceRequestMember";
import ServiceRequestCustomer from "./pages/ServiceRequestCustomer";
import AboutUs from "./pages/AboutUs";
import UserManuals from "./pages/UserManuals";
import HowItWorks from "./pages/HowItWorks";
import MeetTheTeam from "./pages/MeetTheTeam";
import MotoristDashboard from "./pages/MotoristDashboard";
import APDashboard from "./pages/APDashboard";
import Account from "./components/account/Account";
import { Theme } from "./components/Theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/user-manuals" component={UserManuals} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/meet-the-team" component={MeetTheTeam} />
            <Route path="/service-request" component={RequestService} />
            <Route
              path="/service-request-customer"
              component={ServiceRequestCustomer}
            />
            <Route
              path="/service-request-member"
              component={ServiceRequestMember}
            />
            <Route
              path="/service-request-confirm"
              component={RequestServiceConfirmation}/>
            <Route
              path="/service-request-result"
              component={RequestServiceResult}/>
            <Route path="/service-receipt" component={ServiceReceipt} />
            <Route path="/login" component={Login} />
            <Route path="/login-motorist" component={LoginMotorist} />
            <Route path="/login-ap" component={LoginAP} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signup-ap" component={SignUpAP} />
            <Route path="/signup-motorist" component={SignUpMotorist} />
            <Route path="/member-dashboard" component={MotoristDashboard} />
            <Route path="/ap-dashboard" component={APDashboard} />
            <Route path="/account" component={Account} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
