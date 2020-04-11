import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from "./shared/Navigation/MainNavigation"
import Portfolios from "./portfolio/pages/Portfolios"
import Auth from "./user/Auth"
import { AuthContext } from "./shared/Context/AuthContext"
import Home from "./home/Home"
import Analytics from "./analysis/pages/Analytics"
import { useAuth } from './shared/hooks/auth-hook';


function App() {
  const { accessToken, login, logout, refreshToken } = useAuth();
  let routes;
  if (accessToken) {
    routes = (
      <Switch>
        <Route path="/portfolios" exact>
          <Portfolios />
        </Route>
        <Route path="/about" exact>
          <h2>Hello</h2>
        </Route>
        <Route path="/analytics/portfolio/:portfolioName" exact>
          <Analytics />
        </Route>
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
      </Router>
    </AuthContext.Provider>

  );
}

export default App;  
