// src/components/Navbar.js
import React from "react";
import { removeToken, getToken } from "../utils";


const Navbar = () => {
  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  return (
    <nav>
      <h1>Notes App</h1>
      {getToken() ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
