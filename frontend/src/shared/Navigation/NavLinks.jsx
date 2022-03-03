import React, { useContext } from "react"
import "./NavLinks.css"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"

const NavLinks = () => {
    const auth = useContext(AuthContext)
    return (
        <ul className="nav-links">
            {auth.isLoggedIn && <li>
                <NavLink to="/portfolios" exact> My Portfolios </NavLink>
            </li>}
            <li>
                <NavLink to="/learn" exact> Learn </NavLink>
            </li>
            <li>
                <NavLink to="/blog" exact> Blog </NavLink>
            </li>
            {/* <li>
                <NavLink to="/about-nestq" exact> About NestQ </NavLink>
            </li>
            <li>
                <NavLink to="/about-me" exact> About Me </NavLink>
            </li> */}
            {auth.isLoggedIn && <li>
                <button onClick={auth.logout}>Logout</button>
            </li>}
            {!auth.isLoggedIn && <li>
                <NavLink to="/auth" exact> Authenticate </NavLink>
            </li>}
        </ul>
    )
}
export default NavLinks;
