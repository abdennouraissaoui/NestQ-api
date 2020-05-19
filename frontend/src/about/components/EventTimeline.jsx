import React from "react";
import { Timeline } from "antd";

const timeline = require("./timeline.json");
const EventTimeline = () => {
const rightNow = "Seeking a quantitative role at small financial firm. Taking online courses: Vector Calculus, Linear Optimization and Differential Equations. I continue to work hard on NestQ with the remaining time"
  return (
    <Timeline reverse mode="alternate" pending={rightNow}>
      {
          timeline.map((event, index)=>{
            return <Timeline.Item key={index} label={event.date}>{event.description}</Timeline.Item>
          })
      }
    </Timeline>
  );
};

export default EventTimeline;
