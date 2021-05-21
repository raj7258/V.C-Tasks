import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import "./GoogleLogin.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { IS_REGISTERED, GOOGLE_LOGIN_URL } from "../../Api/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "../FormComponents/Notification/redux/actions/actions";
import { useHistory } from "react-router-dom";
import { gapi } from "gapi-script";
import { setAuthToken } from "../redux/actions/actions";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
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
}));

const LoginWithGoogle = () => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState("");
  const [error, setError] = useState({
    helperText: "",
    errorStatus: false,
  });
  const [userData, setUserData] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);

  function errorNotification() {
    dispatch(
      openNotification({
        text: "Something Went Wrong",
        severity: "error",
        show: true,
      })
    );
  }

  //To Select different user When you click on login with google button
  const autoRemove = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2
        .signOut()
        .then(auth2.disconnect().then(console.log("LOGOUT SUCCESSFUL")));
    }
  };

  const onSuccess = (googleData) => {
    console.log("google response", googleData);
    let { profileObj } = googleData;
    let dataObject = {
      token: googleData.tokenId,
      id: googleData.googleId,
      platform: "google",
      imageUrl: profileObj.imageUrl,
    };
    axios
      .post(IS_REGISTERED, { email: profileObj.email })
      .then((res) => {
        let { user, token } = res.data;
        if (user) {
          localStorage.setItem("token", JSON.stringify(token));
          dispatch(setAuthToken(token));
          history.push(`/${user.userType}`);
          setUserType("");
          openNotification({
            text: "Login successful",
            severity: "success",
            show: true,
          });
        } else {
          setOpen(true);
          setUserData(dataObject);
        }
      })
      .catch((err) => {
        errorNotification();
      });
  };

  const onFailure = (error) => {
    console.log("error", error);
    errorNotification();
  };

  const handleChange = (event) => {
    let { value } = event.target;
    if (value !== "select") {
      setUserType(value);
      setError({
        helperText: "",
        errorStatus: false,
      });
    } else {
      setUserType(value);
      setError({
        helperText: "Please Select User Type",
        errorStatus: true,
      });
    }
  };
  let { errorStatus, helperText } = error;

  useEffect(() => {
    if (userType !== "select" && userType !== "") {
      setOpen(false);
      let formData = { ...userData, userType };
      console.log(formData);
      axios
        .post(GOOGLE_LOGIN_URL, formData)
        .then((res) => {
          console.log("response", res);
          let { user, token } = res.data;
          localStorage.setItem("token", JSON.stringify(token));
          dispatch(setAuthToken(token));
          autoRemove();
          setUserType("");
          history.push(`/${user.userType}`);
          openNotification({
            text: "Login successful",
            severity: "success",
            show: true,
          });
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    }
  }, [userType]);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Please Select User Type</h2>
      <div id="simple-modal-description">
        {/* <form onSubmit={handleTypeSubmit}> */}
        <FormControl
          className={classes.formControl}
          variant="outlined"
          error={errorStatus}
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
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
        {/* <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </FormControl> */}
        {/* </form> */}
      </div>
    </div>
  );
  return (
    <>
      <GoogleLogin
        className="Google-login-btn"
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ fontSize: "20px" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default LoginWithGoogle;
