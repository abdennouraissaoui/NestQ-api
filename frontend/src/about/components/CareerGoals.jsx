import React from "react";
import { Typography } from "antd";

const CareerGoals = () => {
  return (
    <React.Fragment>
      <Typography.Title level={4}>Near-term</Typography.Title>
      <p>
        I have taken several finance, mathematics and computer science courses;
        a quantitative role at a financial firm, preferably small, would be a
        great fit for my skillset. 
        <br/>
        What I like about smaller firms:
        <ul>
          <li>
            Roles are less specialized. One gets to wear multiple hats and gain
            knowledge and insight beyond their role
          </li>
          <li>
            As the firm’s budget is relatively limited, one will have the
            opportunity to stretch their creativity
          </li>
          <li>
            Most importantly, one can see a clearer impact of their work and
            thus get closer to the firm’s mission
          </li>
        </ul>
      </p>
      <Typography.Title level={4}>Long-term</Typography.Title>
      <p>
        One day I’d like to be able to use my knowledge of economics, finance
        and machine learning to find order in the complex and dynamic financial
        system. Failing to achieve that, I would like to at least quantify the
        chaos and understand how to mitigate its effects.
      </p>
    </React.Fragment>
  );
};

export default CareerGoals;
