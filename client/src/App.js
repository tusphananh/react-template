import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Views/Landing";
import AuthProvider from "./contexts/AuthContext";
import DashBoard from "./components/Views/DashBoard";
import Register from "./components/Views/Register";
import Login from "./components/Views/Login";

require("dotenv").config({ path: __dirname + "../.env" });
const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => (
            <AuthProvider>
              <Login {...props} route="login" />
            </AuthProvider>
          )}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => (
            <AuthProvider>
              <DashBoard {...props} route="dashboard" />
            </AuthProvider>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => <Landing {...props} route="homepage" />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} route="register" />}
        />
      </Switch>
    </Router>
  );
};

export default App;
