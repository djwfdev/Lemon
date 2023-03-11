/* Home page holds the hero section and the sign up cards */  

import React from "react";
import "../App.css";
import SignUpCards from "../components/SignUpCards";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <HeroSection />
            <SignUpCards />
            <Footer />
        </>
    );
};

export default Home;
