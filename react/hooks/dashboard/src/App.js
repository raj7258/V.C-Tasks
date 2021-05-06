import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import LogIn from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

const App = () => {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
