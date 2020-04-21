import React from "react";
import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <ul className="footer-links">
                <li>
                    <NavLink to="/terms-of-service" exact>Terms of Service</NavLink>
                </li>
                <li>
                    <NavLink to="/privacy-policy" exact>Privacy Policy</NavLink>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;