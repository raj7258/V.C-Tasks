import React, { useState } from "react";
import Heading from "../FormComponents/Heading/Heading";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  FormControl,
  Button,
  InputAdornment,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Route from "../FormComponents/Route/Route";
import { LOGIN_URL } from "../../Api/ApiRoutes";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: { helperText: "", errorStatus: false },
    passwordError: { helperText: "", errorStatus: false },
  });
  const [showPassword, setPasswordVisibility] = useState(false);
  const useStyle = makeStyles({
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
  });
  let history = useHistory();
  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "email":
        if (value.includes("@")) {
          setUserData({
            ...userData,
            email: value,
            userName: "",
          });
        } else {
          setUserData({
            ...userData,
            userName: value,
            email: "",
          });
        }
        setError({
          ...error,
          emailError: { helperText: "", errorStatus: false },
        });
        break;
      case "password":
        if (value.length < 8) {
          setUserData({
            ...userData,
            password: value,
          });
          setError({
            ...error,
            passwordError: {
              helperText: "Password Should Be 8 Character Long",
              errorStatus: true,
            },
          });
        } else {
          setUserData({
            ...userData,
            password: value,
          });
          setError({
            ...error,
            passwordError: { helperText: "", errorStatus: false },
          });
        }

        break;
      default:
        setUserData({ ...userData });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError.errorStatus && !passwordError.errorStatus) {
      axios
        .post(LOGIN_URL, userData)
        .then((res) => {
          console.log("res", res);
          let { user, token } = res.data;
          localStorage.setItem("user", JSON.stringify(res.data));
          history.push({
            pathname: `/${user.userType}`,
            state: {
              user,
              token,
            },
          });
        })
        .catch((err) => {
          console.log("err", err.response);
          let { message } = err.response.data;
          if (typeof message === "string")
            if (message.includes("password")) {
              setError({
                ...error,
                passwordError: { helperText: message, errorStatus: true },
              });
            } else {
              setError({
                ...error,
                emailError: { helperText: message, errorStatus: true },
              });
            }
        });
    }
  };

  const handleShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };

  let classes = useStyle();
  let { email, userName, password } = userData;
  let { emailError, passwordError } = error;
  localStorage.clear();
  return (
    <div className="login-div">
      <Heading>Login Page</Heading>
      <form onSubmit={handleSubmit} className="login-form">
        <FormControl className={classes.formControl}>
          <TextField
            type="text"
            label="Username/Email"
            variant="outlined"
            name="email"
            value={email ? email : userName}
            onChange={handleChange}
            error={emailError.errorStatus}
            helperText={emailError.helperText}
            required
          ></TextField>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            type={showPassword ? "text" : "password"}
            label="password"
            variant="outlined"
            name="password"
            value={password}
            onChange={handleChange}
            error={passwordError.errorStatus}
            helperText={passwordError.helperText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <div
                      onClick={handleShowPassword}
                      className="show-password-icon"
                    >
                      <VisibilityOffIcon />
                    </div>
                  ) : (
                    <div
                      onClick={handleShowPassword}
                      className="show-password-icon"
                    >
                      <VisibilityIcon />
                    </div>
                  )}
                </InputAdornment>
              ),
            }}
            required
          ></TextField>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </FormControl>
        <Route info="Don't have Account?" text="SignUp" path="/register" />
        <Link to="/forgetpassword" className="forget-Password">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
