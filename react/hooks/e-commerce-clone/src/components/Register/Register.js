import React, { useState } from "react";
import "./Register.css";
import Heading from "../FormComponents/Heading/Heading";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Route from "../FormComponents/Route/Route";
import { REGISTER_URL } from "../../Api/ApiRoutes";
import { useDispatch } from "react-redux";
import { openNotification } from "../FormComponents/Notification/redux/actions/actions";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    userName: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    nameError: { helperText: "", errorStatus: false },
    emailError: { helperText: "", errorStatus: false },
    userNameError: { helperText: "", errorStatus: false },
    userTypeError: { helperText: "", errorStatus: false },
    passwordError: { helperText: "", errorStatus: false },
    confirmPasswordError: { helperText: "", errorStatus: false },
  });

  const [showPassword, setPasswordVisibility] = useState(false);
  const [showConfirmPassword, setConfirmPasswordVisibility] = useState(false);

  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let userNameRegex = /^(?=^.{3,10}$)[a-zA-Z0-9]+$/;
  const history = useHistory();
  const dispatch = useDispatch();
  const useStyle = makeStyles({
    inputs: {
      width: "60%",
      marginBottom: "30px",
      height: "10%",
    },
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
  });

  const handleShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setConfirmPasswordVisibility(!showConfirmPassword);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        if (
          value.length < 3 ||
          value.length > 50 ||
          value.match("^[a-zA-Z]+$")
        ) {
          setUserData({
            ...userData,
            name: value,
          });
          setError({
            ...error,
            nameError: {
              helperText: "Name Must be 3 character Long",
              errorStatus: true,
            },
          });
        } else {
          setUserData({
            ...userData,
            name: value,
          });
          setError({
            ...error,
            nameError: {
              helperText: "",
              errorStatus: false,
            },
          });
        }
        break;
      case "email":
        if (value.match(emailRegex)) {
          setUserData({
            ...userData,
            email: value,
          });
          setError({
            ...error,
            emailError: {
              helperText: "",
              errorStatus: false,
            },
          });
        } else {
          setUserData({
            ...userData,
            email: value,
          });
          setError({
            ...error,
            emailError: {
              helperText: "Field Must Contain Valid Email",
              errorStatus: true,
            },
          });
        }

        break;
      case "username":
        if (value.match(userNameRegex)) {
          setUserData({
            ...userData,
            userName: value,
          });
          setError({
            ...error,
            userNameError: {
              helperText: "",
              errorStatus: false,
            },
          });
        } else {
          setUserData({
            ...userData,
            userName: value,
          });
          setError({
            ...error,
            userNameError: {
              helperText: "Username Must Be Valid",
              errorStatus: true,
            },
          });
        }

        break;
      case "userType":
        if (value !== "select") {
          setUserData({
            ...userData,
            userType: value,
          });
          setError({
            ...error,
            userTypeError: { helperText: "", errorStatus: false },
          });
        } else {
          setUserData({
            ...userData,
            userType: value,
          });
          setError({
            ...error,
            userTypeError: {
              helperText: "Please Select User Type",
              errorStatus: true,
            },
          });
        }

        break;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !nameError.errorStatus &&
      !emailError.errorStatus &&
      !userTypeError.errorStatus &&
      !userNameError.errorStatus &&
      !passwordError.errorStatus &&
      !confirmPasswordError.errorStatus
    ) {
      const formData = { ...userData };
      console.log("formdata", formData);
      delete formData.confirmPassword;
      axios
        .post(REGISTER_URL, formData)
        .then((response) => {
          console.log(response);
          let { user, token } = response.data;
          localStorage.setItem("token", JSON.stringify(token));
          history.push({
            pathname: `/${user.userType}`,
          });
          dispatch(
            openNotification({
              text: "Registeration successful",
              severity: "success",
              show: true,
            })
          );
        })
        .catch((err) => {
          if (err.response) {
            let { message } = err.response.data;
            if (message.includes("email")) {
              setError({
                ...error,
                emailError: { helperText: message, errorStatus: true },
              });
            } else {
              setError({
                ...error,
                userNameError: { helperText: message, errorStatus: true },
              });
            }
          } else {
            dispatch(
              openNotification({
                text: "Something Went Wrong",
                severity: "error",
                show: true,
              })
            );
          }
        });
    }
  };
  const classes = useStyle();
  let { name, email, userName, userType, password, confirmPassword } = userData;
  let {
    nameError,
    emailError,
    userNameError,
    userTypeError,
    passwordError,
    confirmPasswordError,
  } = error;
  localStorage.clear();
  return (
    <div className="register-div">
      <Heading>Registration Page</Heading>
      <form autoComplete="false" onSubmit={handleSubmit}>
        <TextField
          name="name"
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          className={classes.inputs}
          onChange={handleChange}
          helperText={nameError.helperText}
          error={nameError.errorStatus}
          required
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          className={classes.inputs}
          onChange={handleChange}
          helperText={emailError.helperText}
          error={emailError.errorStatus}
          required
        />
        <TextField
          name="username"
          type="text"
          label="UserName"
          variant="outlined"
          value={userName}
          className={classes.inputs}
          onChange={handleChange}
          helperText={userNameError.helperText}
          error={userNameError.errorStatus}
          required
        />

        <FormControl
          className={classes.formControl}
          variant="outlined"
          error={userTypeError.errorStatus}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Select User Type
          </InputLabel>
          <Select
            name="userType"
            label="Select User Type"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userType}
            onChange={handleChange}
            required
          >
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="vendor">Vendor</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
          <FormHelperText>{userTypeError.helperText}</FormHelperText>
        </FormControl>

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
            Submit
          </Button>
        </FormControl>
      </form>
      <Route info="Already a User?" text="Login" path="/" />
    </div>
  );
};

export default Register;
