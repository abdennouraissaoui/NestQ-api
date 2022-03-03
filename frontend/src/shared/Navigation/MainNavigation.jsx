import React, { useState } from "react";
import MainHeader from "./MainHeader";
import "./MainNavigation.css"
import NavLinks from "./NavLinks"
import Backdrop from "../Backdrop/Backdrop"
import SideDrawer from "./SideDrawer"
import { NavLink } from "react-router-dom"
import logo from '../../logo-161x48.png'

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const closeDrawerHandler = () => setDrawerIsOpen(false)
    const openDrawerHandler = () => setDrawerIsOpen(true)
    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                <NavLinks />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <NavLink to="/">
                    <img style={{height:"20%"}} src={logo} alt="NestQ"/>
                    </NavLink>
                {/* <h1 className="main-navigation__title">

                    
                    
                </h1> */}
                <nav className="main-navigation__header-nav">
                    <NavLinks/>    
                </nav>
            </MainHeader>
        </React.Fragment>

    )
}

export default MainNavigation;