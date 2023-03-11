import React from "react";
import "../App.css";
import UserManualCard from "../components/UserManualCard";
import Footer from "../components/Footer";

// Displaying the two user manual buttons
const UserManuals = () => {
  return (
    <>
      <UserManualCard />
      <Footer />
    </>
  );
};

export default UserManuals;