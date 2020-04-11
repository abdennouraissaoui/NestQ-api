import React, {useContext} from "react"
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
            {!auth.isLoggedIn && <li>
                <NavLink to="/auth" exact> Authenticate </NavLink>
            </li>}
            
            {auth.isLoggedIn && <li>
                <NavLink to="/about" exact> About </NavLink>
            </li>}

            {auth.isLoggedIn && <li>
                <button onClick={auth.logout}>Logout</button>
            </li>}

        </ul>
    )
}
export default NavLinks;
