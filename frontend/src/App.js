import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from "./shared/Navigation/MainNavigation"
import Portfolios from "./portfolio/pages/Portfolios"
import PortfolioArena from "./portfolio/pages/PortfolioArena"
import PortfolioBreakdown from "./portfolio/pages/PortfolioBreakdown"
import Footer from "./shared/Footer/Footer"
import Auth from "./user/Auth"
import { AuthContext } from "./shared/Context/AuthContext"
import Home from "./home/Home"
import { useAuth } from './shared/hooks/auth-hook';
import About from "./about/About"
import PrivacyPolicy from "./shared/Legal/PrivacyPolicy"
import TermsOfService from "./shared/Legal/TermsOfService"
import ReactGa from "react-ga"
import Testing from "./testing/Testing"

function App() {
  useEffect(() => {
    ReactGa.initialize("UA-164944506-1")
    ReactGa.pageview(window.location.pathname)
  })
  const { accessToken, login, logout, refreshToken } = useAuth();
  let routes;
  let sharedRoutes = [
    <Route path="/privacy-policy" key={1} exact>
      <PrivacyPolicy />
    </Route>,
    <Route path="/terms-of-service" key={2} exact>
      <TermsOfService />
    </Route>,
    <Route path="/testing" key={3} exact>
      <Testing />
    </Route>
  ]
  if (accessToken) {
    routes = (
      <Switch>
        <Route path="/portfolios" exact>
          <Portfolios />
        </Route>
        <Route path="/analytics/portfolio/:portfolioName" exact>
          <PortfolioBreakdown />
        </Route>
        <Route path="/analytics/portfolio-comparison/:portfolioName" exact>
          <PortfolioArena />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        {sharedRoutes.map(route => {
          return route
        })}
        <Redirect to="/portfolios" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        {sharedRoutes.map(route => {
          return route
        })}
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!accessToken,
        login: login,
        logout: logout,
        accessToken: accessToken,
        refreshToken: refreshToken
      }}>
      <Router>
        <MainNavigation />
        <main >
          {routes}
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>

  );
}

export default App;  
