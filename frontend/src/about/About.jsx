import React from "react"
import "./About.css"
import { Typography } from 'antd';
const { Title } = Typography;


const About = () => {
    return (
        <React.Fragment>
            {/* Team Section */}
            <div className="container1" id="team">
                <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginBottom: "50px" }}>
                    <Title style={{ color: "#2C3334", marginTop: "50px" }} level={1}>THE TEAM</Title>
                    <Title style={{ color: "#00B8D7"}} level={4}>Contributors:</Title>
                    <h3>Abdennour Aissaoui</h3>
                    <h3>Hugh Ding</h3>
                    <h3>Xinzheng Xu</h3>
                </div>
            </div>

            {/* Service Section */}
            <div className="container2" id="service">
                <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "50px", marginBottom: "25px" }}>
                    <Title style={{ color: "white", marginTop: "50px" }} level={1}>OUR SERVICES</Title>
                    <Title style={{ color: "#00B8D7", marginBottom: "50px" }} level={4}></Title>
                    <Title style={{ color: "#00B8D7", marginBottom: "50px" }} level={4}>Personalized portfolios with manual or specified allocations, including Markowitz model and Hierarchical Risk Parity</Title>
                    <Title style={{ color: "#00B8D7"}} level={4}>Fund analysis: Performance (Investment growth, Drawdowns, Calendar year returns)</Title>
                </div>
                <div style={{marginLeft: "360px"}}>
                    <Title style={{ color: "#00B8D7"}} level={4}>Attribution</Title>
                    <Title style={{ color: "#00B8D7"}} level={4}>Rick metrics</Title>
                    <Title style={{ color: "#00B8D7"}} level={4}>Correlation</Title>
                    <Title style={{ color: "#00B8D7"}} level={4}>Recommendations</Title>
                </div>
            </div>
        </React.Fragment>
    )
}

export default About; 