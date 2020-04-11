import React from 'react';
import Card from "../shared/Card/Card"
import LoginForm from "./LoginForm"
import { Tabs } from "antd"
import SignupForm from "./SignupForm"
import logo from '../logo-161x48.png'
const Auth = () => {

  const { TabPane } = Tabs;
  return (
    <Card className="authentication">
      <img src={logo} alt="NestQ" className="center pt4" />
      <Tabs className="tc" size="large" defaultActiveKey="login">
        <TabPane tab="Log in" key="login">
          <LoginForm />
        </TabPane>
        <TabPane tab="Register" key="register">
          <SignupForm />
        </TabPane>
      </Tabs>
    </Card>
  )
};
export default Auth;


