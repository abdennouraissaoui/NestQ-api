import React from "react"
import "./About.css"
import { Typography, Space } from 'antd';
import Me from "./me.png"



const paragraphStyle = {
    fontSize: "16px"
}


const About = () => {
    return (
        <div className="container">

            <img src={Me} style={{ maxWidth: "200px", borderRadius: "70%" }} className="center" alt="Me" />
            <br />
            <br />
            <Space direction="vertical" size="small">
                <Typography.Paragraph style={paragraphStyle}>
                    My name is Abdennour. I recently finished my undergraduate studies in finance and computer science at the University of Toronto.
                    </Typography.Paragraph>
                <Typography.Paragraph style={paragraphStyle}>
                    I am dedicated to making investing simple and low-cost through the use of ETFs and modern portfolio optimization techniques. This top-down approach to investing piqued my interest after reading Ray Dalio’s book, <i>Principles</i>. Ever since, I have taken additional mathematics and programming courses in order to bring this philosophy to life.
                    </Typography.Paragraph>
                <Typography.Paragraph style={paragraphStyle}>
                    I have been working on NestQ since March 2020 and it is a first step to the long-term goal of mine. NestQ serves as a free alternative to the very costly portfolio tools provided by Bloomberg, Factset and Morningstar. As I continue to broaden my knowledge in asset allocation and portfolio analytics, NestQ will see lots of new features. Here’s what I have in mind at the moment:
                        <ul>
                        <li>
                            A new technique for assessing portfolio diversification. I got this idea as I was learning about the techniques of unsupervised machine learning. In short, most asset classes are somewhat correlated and thus share common risk(s). With unsupervised learning, I can identify the unique set of risks that stem from the different asset classes. Then, I run a regression on the portfolio and uncorrelated risks and assess the statistical significance of the exposures. A well-diversified portfolio will be exposed to several risks.
                        </li>
                        <li>
                            The Black–Litterman model which allows investors to incorporate their beliefs of future asset class returns
                            </li>
                        <li>
                            Finally, I will include more tools that apply machine learning to investing. Marcos M. Lopez De Prado’s book, “Machine Learning for Asset Managers”, is full of just that. Very excited to read it!
                            </li>
                    </ul>
                </Typography.Paragraph>
            </Space>
        </div>
    )
}

export default About; 