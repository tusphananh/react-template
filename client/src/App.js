import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Views/Auth";
import Landing from "./components/Views/Landing";
import AuthProvider from "./contexts/AuthContext";
import DashBoard from "./components/Views/DashBoard";

require('dotenv').config({path: __dirname + "../.env"})
const App = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} route="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} route="register" />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => <DashBoard {...props} route="dashboard" />}
          />
          <Route exact path="/" render={(props) => <Landing {...props} />} />
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default App;
