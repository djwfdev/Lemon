/* AboutUsCard is hold by the AboutUs page which includes all the component showed in AboutUs page
This page is also linked with AboutSection for the content and links attached with it */

import React from "react";
import "../App.css";
import "./AboutSections.css";
import AboutSection from "../components/AboutSection";

const AboutUsCard = () => {
    return (
        <>
            <div className="aboutSections">
                <h1>About Us</h1>
                <div className="aboutSections-container">
                    <div className="aboutSections-wrapper">
                        <ul className="aboutSections-items">
                            <AboutSection
                                src="images/team.jpg"
                                text="Meet the team"
                                href="/meet-the-team"
                            />
                            <AboutSection
                                src="images/phone.jpg"
                                text="How it works"
                                href="/how-it-works"
                            />
                            <AboutSection
                                src="images/cogs.jpg"
                                text="Download user manual"
                                href="/user-manuals"
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsCard;