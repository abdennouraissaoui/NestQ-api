import React from "react";
import { Timeline } from "antd";

const timeline = require("./timeline.json");
const EventTimeline = () => {
  const rightNow = <div>
    Back to the University of Toronto for a Master's in Financial Engineering. 
    <br/>
    Working as a Teaching Assistant for 6 courses: Statistics, Risk Management, Behavioral Finance, Derivatives, Investments, and Macroeconomics. 
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
