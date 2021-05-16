import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  FormControl,
  Button,
  InputAdornment,
} from "@material-ui/core";
import "./ResetPassword.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Heading from "../../FormComponents/Heading/Heading";
import Route from "../../FormComponents/Route/Route";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { RESET_PASSWORD_URL } from "../../../Api/ApiRoutes";

const ResetPassword = () => {
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setPasswordVisibility] = useState(false);
  const [showConfirmPassword, setConfirmPasswordVisibility] = useState(false);
  const [error, setError] = useState({
    passwordError: { helperText: "", errorStatus: false },
    confirmPasswordError: { helperText: "", errorStatus: false },
  });

  let history = useHistory();
  let location = useLocation();
  let { state } = location;
  const useStyle = makeStyles({
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
    inputs: {
      width: "60%",
      marginBottom: "30px",
      height: "10%",
    },
  });

  const handleShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmPasswordVisibility(!showConfirmPassword);
  };
  let classes = useStyle();
  let { password, confirmPassword } = userData;
  let { passwordError, confirmPasswordError } = error;

  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "password":
        if (value.length >= 8) {
          setUserData({
            ...userData,
            password: value,
          });
          setError({
            ...error,
            passwordError: {
              helperText: "",
              errorStatus: false,
            },
          });
        } else {
          setUserData({
            ...userData,
            password: value,
          });
          setError({
            ...error,
            passwordError: {
              helperText: "Password Must Be Of 8 Character",
              errorStatus: true,
            },
          });
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          setUserData({
            ...userData,
            confirmPassword: value,
          });
          setError({
            ...error,
            confirmPasswordError: {
              helperText: "Confirm Password Must Be Same As Password",
              errorStatus: true,
            },
          });
        } else {
          setUserData({
            ...userData,
            confirmPassword: value,
          });
          setError({
            ...error,
            confirmPasswordError: {
              helperText: "",
              errorStatus: false,
            },
          });
        }
        setUserData({
          ...userData,
          confirmPassword: value,
        });
        break;
      default:
        setUserData({ ...userData });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passwordError.errorStatus && !confirmPasswordError.errorStatus) {
      let formData = { ...state, newPassword: password };
      axios
        .post(RESET_PASSWORD_URL, formData)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          let { message } = err.response.data;
          setError({
            ...error,
            passwordError: {
              helperText: message,
              errorStatus: true,
            },
          });
        });
    }
  };

  if (!state) {
    return <Redirect to="/" />;
  }

  return (
    <div className="reset-password-div">
      <Heading>Reset Password</Heading>
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          value={password}
          className={classes.inputs}
          onChange={handleChange}
          helperText={passwordError.helperText}
          error={passwordError.errorStatus}
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
        />

        <TextField
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          className={classes.inputs}
          onChange={handleChange}
          helperText={confirmPasswordError.helperText}
          error={confirmPasswordError.errorStatus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showConfirmPassword ? (
                  <div
                    onClick={handleShowConfirmPassword}
                    className="show-password-icon"
                  >
                    <VisibilityOffIcon />
                  </div>
                ) : (
                  <div
                    onClick={handleShowConfirmPassword}
                    className="show-password-icon"
                  >
                    <VisibilityIcon />
                  </div>
                )}
              </InputAdornment>
            ),
          }}
          required
        />
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Change Password
          </Button>
        </FormControl>
      </form>
      <Route info="Already a User?" text="Login" path="/" />
    </div>
  );
};

export default ResetPassword;
