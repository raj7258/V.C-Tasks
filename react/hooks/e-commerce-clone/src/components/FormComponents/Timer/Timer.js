import React from "react";
import { useState, useEffect } from "react";
import { FormControl, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { FORGOT_PASSWORD_URL } from "../../../Api/ApiRoutes";

const Timer = (props) => {
  const { initialMinute = 2, initialSeconds = 0, userData } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const useStyle = makeStyles({
    formControl: {
      minWidth: "60%",
      marginBottom: "30px",
      textAlign: "left",
    },
  });
  let classes = useStyle();

  const handleResendOtp = () => {
    axios
      .post(FORGOT_PASSWORD_URL, userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error", err.response);
        // let { message } = err.response.data;
        // setError({
        //   helperText: message,
        //   errorStatus: true,
        // });
      });
  };

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <FormControl className={classes.formControl}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleResendOtp}
          >
            Resend Otp
          </Button>
        </FormControl>
      ) : (
        <h2 style={{ color: "#3f51b5" }}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      )}
    </div>
  );
};

export default Timer;
