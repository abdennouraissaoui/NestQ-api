import React from "react";
import "./About.css";
import { Typography } from "antd";
import Me from "./me.png";
import Books from "../components/Books";

const paragraphStyle = {
  fontSize: "16px",
};

const AboutMe = () => {
  return (
    <div className="container">
      <img
        src={Me}
        style={{ maxWidth: "200px", borderRadius: "70%" }}
        className="center"
        alt="Me"
      />
      <br />
      <br />
      <Typography.Paragraph style={paragraphStyle}>
        My name is Abdennour. I recently finished my undergraduate studies in
        finance and computer science at the University of Toronto.
      </Typography.Paragraph>
      <Typography.Title level={2}>Drive</Typography.Title>
      <Typography.Title level={2}>Goals</Typography.Title>
      <Typography.Title level={4}>Long term</Typography.Title>
      <Typography.Title level={4}>Short term</Typography.Title>
      <Typography.Title level={2}>Reading</Typography.Title>
      <p>
        I see incredible value in reading about subjects that are new to me,
        this way I know what I don’t know. For that reason, I try to not limit
        my readings to specific subjects.
        <br />
        <br />
        Below are some of the books I’ve read; I suppose there is an
        overrepresentation of self-development books
      </p>
      <br />
      <Books />
      <Typography.Title level={2}>Timeline</Typography.Title>
    </div>
  );
};

export default AboutMe;
