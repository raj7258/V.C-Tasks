import React, { useState } from "react";
import Heading from "../../FormComponents/Heading/Heading";
import "./VerifyOtp.css";
import { makeStyles, TextField, FormControl, Button } from "@material-ui/core";
import Route from "../../FormComponents/Route/Route";
import Timer from "../../FormComponents/Timer/Timer";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { VERIFY_OTP_URL } from "../../../Api/ApiRoutes";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({ helperText: "", errorStatus: false });
  let history = useHistory();
  let location = useLocation();
  let { state } = location;

  const useStyle = makeStyles({
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setOtp(value !== "" ? +value : "");
    // if (value === "") {
    //   setOtp("");
    // } else {
    //   setOtp(+value);
    // }
    setError({
      helperText: "",
      errorStatus: false,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = { ...state, otp };
    axios
      .post(VERIFY_OTP_URL, formData)
      .then((response) => {
        history.push({
          pathname: "/resetpassword",
          state: response.data,
        });
      })
      .catch((err) => {
        let { message } = err.response.data;
        setError({
          helperText: message,
          errorStatus: true,
        });
      });
  };

  let classes = useStyle();
  let { helperText, errorStatus } = error;

  if (!state) {
    return <Redirect to="/" />;
  }
  return (
    <div className="otp-verify-div">
      <Heading>Verify OTP</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <TextField
            type="number"
            name="otp"
            label="Enter OTP"
            variant="outlined"
            onChange={handleChange}
            value={otp}
            error={errorStatus}
            helperText={helperText}
            required
          />
        </FormControl>
        <Timer userData={state} />
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Verify & Proceed
          </Button>
        </FormControl>
      </form>

      <Route info="Already a User?" text="Login" path="/" />
    </div>
  );
};

export default VerifyOtp;
