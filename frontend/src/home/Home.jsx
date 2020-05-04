import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "antd"
import "./Home.css"
import NestqMain from "./NestQ-Main.png"
import NestqPCA from "./NestQ-PCA.PNG"
import NestqMTS from "./NestQ-Monte-Carlo.PNG"
import NestqRA from "./NestQ-Risk-Analytics.PNG"
import NestFF from "./NestQ-FF.PNG"

import { Typography, Space, Card } from 'antd';
import { Tabs } from 'antd';
import {
    isMobile
} from "react-device-detect";
import Analytics from "../analysis/pages/Analytics"

import {
    RiseOutlined,
    RadarChartOutlined,
    DotChartOutlined,
    AimOutlined,
    SlidersOutlined,
    ShareAltOutlined
} from "@ant-design/icons"


const sampleTearsheet = require("./sample_tearsheet.json")

const analyticsCategories = [
    { key: "performance", tab: "Performance" },
    { key: "attribution", tab: "Attribution" },
    { key: "riskMetrics", tab: "Risk Metrics" },
    { key: "diversification", tab: "Diversification" }
]

const iconStyle = { fontSize: "60px", marginTop: "10px" }

const optimizers = {
    "Maximum Sharpe": {
        description: "Maximize the return per unit of risk",
        icon: <RiseOutlined style={iconStyle} />
    },
    "L2-Regularized Maximum Sharpe": {
        description: "Maximize the return per unit of risk and prevent overfitting ",
        icon: <RadarChartOutlined style={iconStyle} />
    },
    "Minimum Risk": {
        description: "Maximize the return for the lowest risk possible",
        icon: <DotChartOutlined style={iconStyle} />
    },
    "Efficient Return": {
        description: "Minimize the risk for achieving your target return",
        icon: <AimOutlined style={iconStyle} />
    },
    "Efficient Risk": {
        description: "Maximize the return for achieving your target risk level",
        icon: <AimOutlined style={iconStyle} />
    },
    "Hierarchical Risk Parity": {
        description: "Minimize risk by applying hierarchical clustering models",
        icon: <SlidersOutlined style={iconStyle} />
    },
    "Black-Litterman (Coming Soon)": {
        description: "Incorporate your beliefs of future returns",
        icon: <ShareAltOutlined style={iconStyle} />
    }
}


const analytics = {
    "Performance": {
        summary: "Backtest and Simulate a Portfolio",
        description: "Backtest your portfolio to assess its historical performance. Simulate its performance for the next two years using Monte Carlo Simulation ",
        screenshot: NestqMTS
    },
    "Attribution": {
        summary: "Fama-French 5-Factor Model",
        description: "Perform a regression analysis on the famous Fama-French factor model to assess your portfolio's exposure to the market",
        screenshot: NestFF
    },
    "Risk Metrics": {
        summary: "Risk-Return Analysis",
        description: "Assess the risk-return characteristics of your portfolio with 12 different risk metrics",
        screenshot: NestqRA
    },
    "Diversification": {
        summary: "Assess Portfolio Diversification",
        description: "Ensure that the unique sources of risks to your portfolio are well balanced using Principle Component Analysis. Understand the relationship between the constituents with a correlation matrix' ",
        screenshot: NestqPCA
    }
}


const Home = () => {
    return (
        <React.Fragment>
            <div className="intro-container">
                <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto", marginBottom: "50px" }}>
                    <Space direction="vertical">
                        <Typography.Title style={{ color: "white", marginTop: "50px" }} level={isMobile ? 3 : 1}> The Ultimate Portfolio Construction and Analytics Platform</Typography.Title>
                        <Typography.Text style={{ color: "#ccc", marginBottom: "50px", fontSize: isMobile ? "15px" : "20px" }} level={4}>NestQ is an online platform designed to help investors make better asset allocation decisions. It includes several portfolio construction techniques and risks analytics tools for identifying portfolio blind spots</Typography.Text>
                        <NavLink to="/auth" exact> <Button style={{ color: "white", fontWeight: "bold", marginTop: "40px" }} size="large" type="ghost"> Try it now! </Button> </NavLink>
                    </Space>
                    <img src={NestqMain} style={{ maxWidth: "1000px", width: "100%", marginTop: "50px", }} alt="NestQ's main page" />
                </div>

                <div style={{ backgroundColor: "#FFFFFF", width: "100%", marginLeft: "auto", marginRight: "auto", marginTop: "200px", marginBottom: "50px" }}>
                    <div style={{ width: "90%", maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
                        <Typography.Title style={{ color: "#495354", marginTop: "100px" }} level={isMobile ? 3 : 1}> State of the art optimizers for efficient asset allocation</Typography.Title>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {
                                Object.keys(optimizers).map((optimizer, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            hoverable
                                            style={{ width: 300, margin: "10px" }}
                                            cover={optimizers[optimizer].icon}
                                        >
                                            <Card.Meta title={optimizer} description={optimizers[optimizer].description} />
                                        </Card>
                                    )
                                })
                            }
                        </div>
                        <Typography.Title style={{ color: "#495354", marginTop: "100px" }} level={isMobile ? 3 : 1}> Powerful portfolio analytics delivered in an intuitive interface</Typography.Title>
                        <div style={{ margin: "auto" }}>
                            <Tabs defaultActiveKey={1}>

                                {Object.keys(analytics).map((tab, index) => {
                                    return (
                                        <Tabs.TabPane tab={tab} key={index}>
                                            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                                                <div style={{ margin: 10, display: "flex", flexDirection: "column", textAlign: "left", verticalAlign: "middle" }}>
                                                    <Typography.Text style={{ fontSize:  isMobile? "17px": "20px", fontWeight: "bold" }}>{analytics[tab].summary}</Typography.Text>
                                                    <Typography.Text style={{ fontSize: isMobile? "13px": "15px" }}>{analytics[tab].description}</Typography.Text>
                                                </div>
                                                <img style={{ width: isMobile ? "100%" : "60%" }} src={analytics[tab].screenshot} alt={tab} />
                                            </div>
                                        </Tabs.TabPane>
                                    )
                                })}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;