import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from "./shared/Navigation/MainNavigation"
import Portfolios from "./portfolio/pages/Portfolios"
import PortfolioArena from "./portfolio/pages/PortfolioArena"
import Footer from "./shared/Footer/Footer"
import Auth from "./user/Auth"
import { AuthContext } from "./shared/Context/AuthContext"
import Home from "./home/Home"
import Analytics from "./analysis/pages/Analytics"
import { useAuth } from './shared/hooks/auth-hook';
import About from "./about/About"
import PrivacyPolicy from "./shared/Legal/PrivacyPolicy"
import TermsOfService from "./shared/Legal/TermsOfService"

function App() {
  const { accessToken, login, logout, refreshToken } = useAuth();
  let routes;
  let sharedRoutes = (
    <React.Fragment>
      <Route path="/privacy-policy" exact>
        <PrivacyPolicy />
      </Route>
      <Route path="/terms-of-service" exact>
        <TermsOfService />
      </Route>
    </React.Fragment>
  )
  if (accessToken) {
    routes = (
      <Switch>
        <Route path="/portfolios" exact>
          <Portfolios />
        </Route>
        <Route path="/analytics/portfolio/:portfolioName" exact>
          <Analytics />
        </Route>
        <Route path="/portfolio-arena" exact>
          <PortfolioArena />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        {sharedRoutes}
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
        {sharedRoutes}
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
