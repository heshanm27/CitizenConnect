import React from "react";
import "../styles/Footer.css"

const year = new Date().getFullYear();

function Footer(){

    return(
        <div className="footer-container"><h4>Copyright {year}</h4></div>
    )
}

export default Footer;
