import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./Home.css";
import NestqMain from "./NestQ-Main.png";
import NestqPCA from "./NestQ-PCA.PNG";
import NestqMTS from "./NestQ-Monte-Carlo.PNG";
import NestqRA from "./NestQ-Risk-Analytics.PNG";
import NestFF from "./NestQ-FF.PNG";

import { Typography, Space, Card } from "antd";
import { Tabs } from "antd";
import { isMobile } from "react-device-detect";

import {
  RiseOutlined,
  DotChartOutlined,
  AimOutlined,
  SlidersOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const iconStyle = { fontSize: "60px", marginTop: "10px" };

const optimizers = {
  "Maximum Sharpe": {
    description:
      "Maximize the return per unit of risk. L2-Regularization available",
    icon: <RiseOutlined style={iconStyle} />,
  },
  "Minimum Risk": {
    description:
      "Maximize the return for the lowest risk possible. L2-Regularization available",
    icon: <DotChartOutlined style={iconStyle} />,
  },
  "Efficient Return": {
    description:
      "Minimize the risk for achieving your target return. L2-Regularization available",
    icon: <AimOutlined style={iconStyle} />,
  },
  "Efficient Risk": {
    description:
      "Maximize the return for achieving your target risk level. L2-Regularization available",
    icon: <AimOutlined style={iconStyle} />,
  },
  "Hierarchical Risk Parity": {
    description:
      "Apply hierarchical clustering models to build a robust minimum volatility portfolio",
    icon: <SlidersOutlined style={iconStyle} />,
  },
  "Black-Litterman (Coming Soon)": {
    description: "Incorporate your beliefs of future returns",
    icon: <ShareAltOutlined style={iconStyle} />,
  },
};

const analytics = {
  Performance: {
    summary: "Backtest and Simulate a Portfolio",
    description:
      "Backtest your portfolio to assess its historical performance. Simulate its performance for the next two years using Monte Carlo Simulation ",
    screenshot: NestqMTS,
  },
  Attribution: {
    summary: "Fama-French 5-Factor Model",
    description:
      "Perform a regression analysis on the famous Fama-French factor model to assess your portfolio's exposure to the market",
    screenshot: NestFF,
  },
  "Risk Metrics": {
    summary: "Risk-Return Analysis",
    description:
      "Assess the risk-return characteristics of your portfolio with 12 different risk metrics",
    screenshot: NestqRA,
  },
  Diversification: {
    summary: "Assess Portfolio Diversification",
    description:
      "Ensure that the unique sources of risks to your portfolio are well balanced using Principle Component Analysis. Understand the relationship between the constituents with a correlation matrix. ",
    screenshot: NestqPCA,
  },
};

const Home = () => {
  return (
    <React.Fragment>
      <div className="intro-container">
        <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
          <Space direction="vertical">
            <Typography.Title
              style={{ color: "white", marginTop: "50px" }}
              level={isMobile ? 3 : 1}
            >
              Fast, Intuitive and Powerful Portfolio Construction and Analytics Platform 
            </Typography.Title>
            <Typography.Text
              style={{
                color: "#ccc",
                marginBottom: "50px",
                fontSize: isMobile ? "15px" : "20px",
                fontWeight:"lighter"
              }}
            >
              NestQ is an online platform designed to help ETF investors make better
              allocation decisions. It includes several portfolio
              construction techniques and risk analytics tools
            </Typography.Text>
            <NavLink to="/auth" exact>
              <Button
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
                size="large"
                type="ghost"
              >
                Try it now!
              </Button>
            </NavLink>
          </Space>
          <img
            src={NestqMain}
            style={{
              maxWidth: "800px",
              width: "100%",
              marginTop: "20px",
              paddingBottom: "50px",
            }}
            alt="NestQ's main page"
          />
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              width: "95%",
              maxWidth: "1300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography.Title
              style={{ color: "#495354", paddingTop: "50px" }}
              level={isMobile ? 3 : 1}
            >
              {" "}
              State of the Art Optimizers for Efficient Allocation
            </Typography.Title>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Object.keys(optimizers).map((optimizer, index) => {
                return (
                  <Card
                    key={index}
                    hoverable
                    style={{ width: 300, margin: "10px" }}
                    cover={optimizers[optimizer].icon}
                  >
                    <Card.Meta
                      title={optimizer}
                      description={optimizers[optimizer].description}
                    />
                  </Card>
                );
              })}
            </div>
            <Typography.Title
              style={{ color: "#495354", marginTop: "100px" }}
              level={isMobile ? 3 : 1}
            >
              {" "}
              Powerful Analytics Delivered in an Intuitive Interface
            </Typography.Title>
            <div style={{ margin: "auto", marginBottom: "150px" }}>
              <Tabs defaultActiveKey={1} size="large">
                {Object.keys(analytics).map((tab, index) => {
                  return (
                    <Tabs.TabPane tab={tab} key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <div
                          style={{
                            margin: 10,
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left",
                            verticalAlign: "middle",
                          }}
                        >
                          <Typography.Text
                            style={{
                              fontSize: isMobile ? "17px" : "20px",
                              fontWeight: "bold",
                              color: "#4b5354",
                            }}
                          >
                            {analytics[tab].summary}
                          </Typography.Text>
                          <Typography.Text
                            style={{
                              fontSize: isMobile ? "13px" : "15px",
                              color: "#4b5354",
                            }}
                          >
                            {analytics[tab].description}
                          </Typography.Text>
                        </div>
                        <img
                          style={{ width: isMobile ? "100%" : "60%" }}
                          src={analytics[tab].screenshot}
                          alt={tab}
                        />
                      </div>
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
