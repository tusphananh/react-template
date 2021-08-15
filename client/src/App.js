import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Views/Auth";
import Landing from "./components/Views/Landing";

const App = () => {
  return (
    <Router>
      <Switch>
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
        <Route exact path="/" render={(props) => <Landing {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
