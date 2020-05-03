import React from "react";
import { NavLink } from "react-router-dom"
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Space } from "antd"



const footerStyle = {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    background: "#1F2127",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.26)",
    left: "0",
    bottom: "0",
    height: "3.3rem",
    width: "100%"
};

const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
};


const linksStyle = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
}


const Footer = () => {
    return (
        <React.Fragment>
            <div style={phantomStyle}></div>
            <div style={footerStyle}>
                <Space size={0} direction="vertical" style={{marginLeft: "auto", marginRight:"auto"}}> 
                <ul style={linksStyle}>
                        <li style={{ marginRight: 10, color: "#ccc" }}>
                            Find me:
                        </li>
                        <li style={{ marginRight: 10 }}>
                            <a href="https://github.com/abdennouraissaoui">
                                <GithubOutlined style={{ fontSize: '24px', color: '#ccc' }} />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/abdennouraissaoui/">
                                <LinkedinOutlined style={{ fontSize: '24px', color: '#ccc' }} />
                            </a>
                        </li>
                    </ul>
                    <ul style={linksStyle}>
                        <li style={{ marginRight: 10 }}>
                            <NavLink style={{ color: "#ccc" }} to="/terms-of-service" exact>Terms of Service </NavLink>
                        </li>
                        <li>
                            <NavLink style={{ color: "#ccc" }} to="/privacy-policy" exact> Privacy Policy</NavLink>
                        </li>
                    </ul>
                </Space>

            </div>
        </React.Fragment>



    )
}

export default Footer;