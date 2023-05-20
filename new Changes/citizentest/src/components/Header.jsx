import React from "react";
import "../styles/Header.css";
import { Link } from 'react-router-dom';
function header() {
  return (
    <div className="header-container">
      <div className="logo">
        <h1>Citizen Connect</h1>
      </div>
      <div className="header-nav">
        <ul>
          <li><a href="../Pages/Home.jsx">Home</a></li>
          <li><a href="../Pages/Documents.jsx">Documents</a></li>
          <li><a href="../Pages/News.jsx">News</a></li>
        </ul>
      </div>
      <div className="button-container" >
        <button>Sign In</button>

      </div>
    </div>
  );
}

export default header;
