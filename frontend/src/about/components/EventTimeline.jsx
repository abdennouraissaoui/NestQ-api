import React from "react";
import { Timeline } from "antd";

const timeline = require("./timeline.json");
const EventTimeline = () => {
  const rightNow = <div>
    Back to the University of Toronto for a Master's in Financial Engineering. 
    <br/>
    <b>Teaching assistant</b> for Statistics, Risk Management & Macroeconomics. 
    <br/>
    <b>Research Assistant:</b> Measuring investor sentiment using Google's Search Volume Index (SVI). 
    <br/>
    <b> Data Analyst:</b> Parsing transcripts of the FOMC from 1974 to understand whether political affiliation influences behaviors/decisions.
  </div>
  return (
    <Timeline reverse mode="alternate" pending={rightNow}>
      {timeline.map((event, index) => {
        return (
          <Timeline.Item key={index} label={event.date}>
            {event.description}
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default EventTimeline;
