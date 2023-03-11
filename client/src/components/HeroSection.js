/* Main part of home page which displays video */ 

import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

const HeroSection = () => {
    return (
        <div className="hero-container">
            <video src="/videos/herovid.mp4" autoPlay loop muted />
            <h1>CAR BROKEN?</h1>
            <p>Request An Assistance Professional, Right Now!</p>
            <div className="hero-btns">
                <Button
                    className="btns"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                    linkto="/service-request"
                >
                    REQUEST
                </Button>
                <Button
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    linkto="/signup"
                >
                    SIGN UP
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
