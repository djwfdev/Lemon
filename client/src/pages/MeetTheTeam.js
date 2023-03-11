/* MeetTheTeam is a page that shows profile of all the team members and it holds the Team from component */ 
/* It also contains footer to display at the end of the page */ 

import React from "react";
import "../App.css";
import Footer from "../components/Footer";
import Team from "../components/Team";

const MeetTheTeam = () => {
    return (
        <>
            <Team />
            <Footer />
        </>
    );
};

export default MeetTheTeam;
