import React from "react";
import "./NavBarStyles.css";

const NavBar = () => {
  return <nav className="navbar">
    <a href="/login">LogIn</a>
    <a href="/signup">SignUp</a>
  </nav>;
};

export default NavBar;
