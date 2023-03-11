/* Navigation bar component which spans across the top of the page */

import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const { logout, checkIsLoggedIn, isAuth, userType } = useContext(AuthContext);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // constantly check if the user is logged in (to change navbar items)
    window.setInterval(function () {
        checkIsLoggedIn();
    }, 500);

    // function to change the login to logout and vice versa    
    const getButton = () => {
        if (isAuth)
            return (
                <Button buttonStyle="btn--outline" linkto="/" onClick={logout}>
                    Log out
                </Button>
            );
        else
            return (
                <Button buttonStyle="btn--outline" linkto="/signup">
                    Sign Up
                </Button>
            );
    };

    // show the hamburger icon if within mobile viewport
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener("resize", showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img src={"images/logo.png"} alt="logo" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link
                                to="/about-us"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/service-request"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Request Service
                            </Link>
                        </li>
                        {!isAuth ? (
                            <li className="nav-item">
                                <Link
                                    to="/login"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    to={`/${userType}-dashboard`}
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {!isAuth ? (
                            <li className="nav-item">
                                <Link
                                    to="/signup"
                                    className="nav-links-mobile"
                                    onClick={closeMobileMenu}
                                >
                                    Sign up
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-links-mobile"
                                    onClick={closeMobileMenu && logout}
                                >
                                    Log out
                                </Link>
                            </li>
                        )} 
                    </ul>
                    {button && getButton()}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
