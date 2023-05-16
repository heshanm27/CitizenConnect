import React from "react";
import "../styles/Header.css";

function header() {
  return (
    <div className="header-container">
      <div className="logo">
        <h1>Citizen Connect</h1>
      </div>
      <div className="header-nav">
        <ul>
          <li>Home</li>
          <li>Documents</li>
          <li>News</li>
        </ul>
      </div>
      <div className="button-container" >
        <button>Sign In</button>

      </div>
    </div>
  );
}

export default header;
