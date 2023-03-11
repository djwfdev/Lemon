/* Simple about us home page to show the links for about us pages */

import React from "react";
import "../App.css";
import AboutUsCard from "../components/AboutUsCard";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <>
            <AboutUsCard />
            <Footer />
        </>
    );
};

export default AboutUs;