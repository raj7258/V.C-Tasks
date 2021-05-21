import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgetPassword/ForgotPassword/ForgotPassword";
import VerifyOtp from "./components/ForgetPassword/VerifyOtp/VerifyOtp";
import ResetPassword from "./components/ForgetPassword/ResetPassword/ResetPassword";
import Vendor from "./components/Vendor/Vendor";
import Customer from "./components/Customer/Customer";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import Notification from "./components/FormComponents/Notification/Notification";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Notification />
      </div>
      <Switch>
        <Route exact path="/customer">
          <Customer />
        </Route>
        <Route  path="/vendor">
          <Vendor />
        </Route>
        <Route exact path="/user/verify/:id">
          <VerifyEmail />
        </Route>
        <Route exact path="/resetpassword">
          <ResetPassword />
        </Route>
        <Route exact path="/otpverify">
          <VerifyOtp />
        </Route>
        <Route exact path="/forgetpassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
