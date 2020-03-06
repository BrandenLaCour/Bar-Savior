import React from "react";
import "./index.css";
import drinks from "./drinks.jpg";

const LandingPage = () => {
  return (
    <div className="home-container">
      <h3 className="title">Welcome To Bar Savior</h3>
      <img id="logo" src={drinks}></img>
    </div>
  );
};

export default LandingPage;
