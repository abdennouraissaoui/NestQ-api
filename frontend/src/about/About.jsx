import React from "react"
import "./About.css"
import { Typography } from 'antd';
const { Title } = Typography;


const About = () => {
    return (
        <div className="container1" id="team">
            <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginBottom: "50px" }}>
                <Title style={{ color: "#2C3334", marginTop: "50px" }} level={1}>THE TEAM</Title>
                <Title style={{ color: "#00B8D7" }} level={4}>Contributors:</Title>
                <h3>Abdennour Aissaoui</h3>
                <h3>Hugh Ding</h3>
                <h3>Xinzheng Xu</h3>
            </div>
        </div>
    )
}

export default About; 