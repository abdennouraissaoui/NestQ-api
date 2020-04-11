import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "antd"
import "./Home.css"
import nestegg from "./nestegg.png"
import { Typography } from 'antd';
const { Title } = Typography;


const Home = () => {
    return (
        <React.Fragment>
            <div className="intro-container">
                <div style={{width:"70%", marginLeft:"auto", marginRight:"auto", marginBottom:"50px"}}>
                    <Title style={{ color: "white", marginTop: "50px" }} level={1}> The Ultimate Portfolio Construction and Analytics Platform</Title>
                    <Title style={{ color: "#ccc", marginBottom: "50px" }} level={4}>NestQ is an investment analysis platform designed to help investors make better asset allocation decisions. It includes several portfolio construction techniques and many risks analytics tools to identify blind spots</Title>
                    <NavLink to="/auth" exact> <Button style={{ color: "white", fontWeight: "bold" }} size="large" type="ghost"> Try it now! </Button> </NavLink>
                </div>
                <img src={nestegg} style={{ maxWidth: "600px" }} alt="Nest Egg" />
            </div>
        </React.Fragment>
    )
}

export default Home;