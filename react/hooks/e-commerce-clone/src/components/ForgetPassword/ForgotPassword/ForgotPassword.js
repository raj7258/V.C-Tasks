import React, { useState } from "react";
import { TextField, FormControl, makeStyles, Button } from "@material-ui/core";
import "./ForgotPassword.css";
import Heading from "../../FormComponents/Heading/Heading";
import Route from "../../FormComponents/Route/Route";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FORGOT_PASSWORD_URL } from "../../../Api/ApiRoutes";
const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
  });
  const [error, setError] = useState({ helperText: "", errorStatus: false });
  let history = useHistory();
  const useStyle = makeStyles({
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
  });

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.includes("@")) {
      setUserData({
        email: value,
        userName: "",
      });
      setError({
        helperText: "",
        errorStatus: false,
      });
    } else {
      setUserData({
        email: "",
        userName: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(FORGOT_PASSWORD_URL, userData)
      .then((res) => {
        history.push({
          pathname: "/otpverify",
          state: res.data,
        });
      })
      .catch((err) => {
        console.log("error", err.response);
        let { message } = err.response.data;
        setError({
          helperText: message,
          errorStatus: true,
        });
      });
  };

  let classes = useStyle();
  let { email, userName } = userData;
  let { helperText, errorStatus } = error;

  return (
    <div className="forgot-password-div">
      <Heading>Forgot Password</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <TextField
            type="text"
            name="email"
            label="Email/Username"
            variant="outlined"
            onChange={handleChange}
            value={email ? email : userName}
            error={errorStatus}
            helperText={helperText}
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Get Otp
          </Button>
        </FormControl>
      </form>
      <Route info="Already a User?" text="Login" path="/" />
    </div>
  );
};

export default ForgotPassword;
