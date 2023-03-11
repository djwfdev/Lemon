import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


import Routes from '../src/App';

import Home from "../src/pages/Home";
import RequestService from "../src/pages/RequestService";
import RequestServiceConfirmation from "../src/pages/RequestServiceConfirmation";
import RequestServiceResult from "../src/pages/RequestServiceResult";
import ServiceReceipt from "../src/pages/ServiceReceipt";
import Login from "../src/pages/Login";
import LoginMotorist from "../src/pages/LoginMotorist";
import LoginAP from "../src/pages/LoginAP";
import SignUp from "../src/pages/SignUp";
import SignUpMotorist from "../src/pages/SignUpMotorist";
import SignUpAP from "../src/pages/SignUpAP";
import ServiceRequestMember from "../src/pages/ServiceRequestMember";
import ServiceRequestCustomer from "../src/pages/ServiceRequestCustomer";
import AboutUs from "../src/pages/AboutUs";
import UserManuals from "../src/pages/UserManuals";
import HowItWorks from "../src/pages/HowItWorks";
import MeetTheTeam from "../src/pages/MeetTheTeam";
import MotoristDashboard from "../src/pages/MotoristDashboard";
import APDashboard from "../src/pages/APDashboard";
import Account from "../src/components/account/Account";

import { Route } from 'react-router-dom';

const ROUTES = [
  ['/', Home], 
  ['/about-us', AboutUs],
  ['/service-request', RequestService],
  ['/service-request-customer', ServiceRequestCustomer],
  ['/service-request-member', ServiceRequestMember],
  ['/service-request-confirm', RequestServiceConfirmation],
  ['/login', Login],
  ['/login-motorist', LoginMotorist],
  ['/login-ap', LoginAP],
  ['/signup', SignUp],
  ['/signup-ap', SignUpAP],
  ['/signup-motorist', SignUpMotorist],
  ['/how-it-works', HowItWorks],
  ['/service-request-confirm', RequestServiceConfirmation],
  ['/service-request-result', RequestServiceResult],
  ['/service-receipt', ServiceReceipt],
  ['/user-manuals', UserManuals],
  ['/meet-the-team', MeetTheTeam],
  ['/member-dashboard', MotoristDashboard],
  ['/ap-dashboard', APDashboard],
  ['/account', Account]
];

configure({adapter: new Adapter()});
let paths = {};
describe('Testing routes', () => {
  beforeAll(() => {
    const routes = shallow(<Routes />);
    paths = routes.find(Route).reduce((path, route) => {
      const routeProps = route.props();
      path[routeProps.path] = routeProps.component;
      return path;
    }, {});
    console.log(paths);
  })

  test.each(ROUTES) (
    "Change to %p in route %p",
    (link, component) => {
      expect(paths[link]).toBe(component);
    }
  );
});
