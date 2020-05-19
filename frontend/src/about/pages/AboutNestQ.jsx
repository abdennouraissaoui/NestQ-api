import React from "react";
import "./About.css";
import { Typography, Space } from "antd";

const paragraphStyle = {
  fontSize: "16px",
};

const AboutNestQ = () => {
  return (
    <div className="container">
      <Space direction="vertical" size="small">
        <Typography.Title level={2}>What is NestQ</Typography.Title>
        <Typography.Paragraph style={paragraphStyle}>
          NestQ is an online platform designed to help passive investors make
          better asset allocation decisions. It includes several portfolio
          construction techniques and risk analytics tools for identifying
          portfolio blind spots.
        </Typography.Paragraph>
        <Typography.Title level={2}>
          What motivated the development of NestQ
        </Typography.Title>
        <Typography.Paragraph style={paragraphStyle}>
          I learn a lot faster and deeper when making real projects. I thought
          this platform would be a great way for me to apply my learnings in
          quantitative finance.
          <br/>
          At the same time, I realized that existing tools
          that aim to achieve a similar goal are either very costly and/or very
          complicated to use. I thought that people with limited resources and
          basic quantitative skills would benefit from a free and intuitive
          platform.
        </Typography.Paragraph>
        <Typography.Title level={2}>What’s coming up </Typography.Title>
        <Typography.Paragraph style={paragraphStyle}>
          As I continue to broaden my knowledge in asset allocation and
          portfolio analytics, NestQ will see lots of new features. Here’s what
          I have in mind at the moment:
          <ul>
            <li>
              A new technique for assessing portfolio diversification. I got
              this idea as I was learning about the techniques of unsupervised
              machine learning. In short, most asset classes are somewhat
              correlated and thus share common risk(s). With unsupervised
              learning, I can identify the unique set of risks that stem from
              the different asset classes. Then, I run a regression on the
              portfolio and uncorrelated risks and assess the statistical
              significance of the exposures. A well-diversified portfolio will
              be exposed to several risks.
            </li>
            <li>
              The Black–Litterman model which allows investors to incorporate
              their beliefs of future asset class returns
            </li>
            <li>Portfolio scenario analysis</li>
            <li>
              Finally, I will include more tools that apply machine learning to
              investing. Marcos M. Lopez De Prado’s book, “Machine Learning for
              Asset Managers”, is full of just that. Very excited to read it and
              share my findings!
            </li>
          </ul>
          If you notice any bugs or would like NestQ to have a particular
          feature, please reach out to me by email:{" "}
          <a href="mailto:abdennour.aissaoui@mail.utoronto.ca">
            abdennour.aissaoui@mail.utoronto.ca
          </a>{" "}
          thanks
        </Typography.Paragraph>
        <Typography.Title level={2}> How it was built </Typography.Title>
        <Typography.Paragraph style={paragraphStyle}>
          I always turned to Python whenever I needed the computer's help. With
          the simple syntax, its charm never faded for me and I have been using
          it for 5 years now. I built the backend using Python and the
          following libraries: Sklearn, Numpy, Pandas, Statsmodels, Flask,
          SQLAlchemy.
          <br />
          <br />
          For the frontend I had a ton fun using ReactJS which I learned about as
          I'm building NestQ.
          However, I admit I did not get as much of a kick out of
          CSS.
        </Typography.Paragraph>
      </Space>
    </div>
  );
};

export default AboutNestQ;
