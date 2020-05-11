import React from "react";
import "./About.css";
import { Typography } from "antd";
import Me from "./me.png";
import Books from "../components/Books";
import EventTimeline from "../components/EventTimeline";
import CareerGoals from "../components/CareerGoals";
import Drive from "../components/Drive";
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
        <br/>
        Get in touch with me: <a href="mailto:abdennour.aissaoui@mail.utoronto.ca">abdennour.aissaoui@mail.utoronto.ca</a>
      </Typography.Paragraph>
      <p></p>
      <Typography.Title level={2}>My career goals</Typography.Title>
      <CareerGoals />
      <Typography.Title level={2}>What drives me</Typography.Title>
      <Drive />
      <Typography.Title level={2}>Favorite readings</Typography.Title>
      <p>
        I see incredible value in reading about subjects that are new to me,
        this way I know what I don’t know. For that reason, I try to not limit
        my readings to specific subjects.
        <br />
        Below are some of the books I’ve read; I suppose there is an
        overrepresentation of self-development books
      </p>
      <br />
      <Books />
      <Typography.Title level={2}>Timeline</Typography.Title>
      <EventTimeline />
    </div>
  );
};

export default AboutMe;
