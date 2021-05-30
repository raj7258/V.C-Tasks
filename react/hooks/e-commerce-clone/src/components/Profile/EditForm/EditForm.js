import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  FormControl,
  InputAdornment,
  Button,
} from "@material-ui/core";
import axios from "axios";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useSelector, useDispatch } from "react-redux";
import { openNotification } from "../../FormComponents/Notification/redux/actions/actions";
import { setUser, setAuthToken } from "../../redux/actions/actions";
import {
  EDIT_PROFILE_URL,
  EMAIL_VERIFICATION_URL,
} from "../../../Api/ApiRoutes";
import ChangePassword from "../ChangePassword/ChangePassword";

const useStyle = makeStyles({
  inputs: {
    width: "50%",
    height: "7%",
    margin: "0 auto",
  },
  formControl: {
    width: "60%",
    marginBottom: "20px",
    textAlign: "left",
  },
  successIcon: {
    color: "green",
  },
  errorIcon: {
    color: "red",
  },
});

let emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let userNameRegex = /^(?=^.{3,10}$)[a-zA-Z0-9]+$/;

export default function EditForm() {
  const state = useSelector((state) => state.userReducer.user);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    products: [],
    userType: "",
    verified: null,
  });

  const [error, setError] = useState({
    nameError: { helperText: "", errorStatus: false },
    emailError: { helperText: "", errorStatus: false },
    userNameError: { helperText: "", errorStatus: false },
  });

  const token = useSelector((state) => state.userReducer.token);

  useEffect(() => {
    if (Object.keys(state).length) {
      setUserData(state);
    }
  }, [state]);

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
      default:
        setUserData({ ...userData });
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setUserData(state);
    setError({
      nameError: { helperText: "", errorStatus: false },
      emailError: { helperText: "", errorStatus: false },
      userNameError: { helperText: "", errorStatus: false },
    });
  };

  const handleResend = () => {
    if (!userData.verified) {
      axios
        .get(EMAIL_VERIFICATION_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          dispatch(
            openNotification({
              text: "Email Verification Link Sent!",
              severity: "success",
              show: true,
            })
          );
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      dispatch(
        openNotification({
          text: "Email Already Verified",
          severity: "success",
          show: true,
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);

    axios
      .post(EDIT_PROFILE_URL, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        let { user, token } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        dispatch(
          openNotification({
            text: "Profile Updated",
            severity: "success",
            show: true,
          })
        );
        setEdit(false);
        dispatch(setUser(user));
        dispatch(setAuthToken(token));
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  };

  let classes = useStyle();
  let { name, email, userName, userType, verified, isSocialLogin } = userData;
  let { nameError, emailError, userNameError } = error;
  return (
    <div style={{ margin: "20px auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
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
            disabled={!edit}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <>
                    <div onClick={handleResend} style={{ cursor: "pointer" }}>
                      <VerifiedUserIcon
                        className={
                          verified ? classes.successIcon : classes.errorIcon
                        }
                      />
                    </div>
                  </>
                </InputAdornment>
              ),
            }}
            disabled
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="usertype"
            type="text"
            label="UserType"
            variant="outlined"
            value={userType}
            className={classes.inputs}
            onChange={handleChange}
            disabled
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="username"
            type="text"
            label="UserName"
            variant="outlined"
            value={userName ? userName : ""}
            className={classes.inputs}
            onChange={handleChange}
            helperText={userNameError.helperText}
            error={userNameError.errorStatus}
            disabled={!edit}
          />
        </FormControl>
        {edit ? (
          <FormControl className={classes.formControl}>
            <Button
              type="submit"
              style={{ width: "50%", margin: "0 auto" }}
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </FormControl>
        ) : null}
      </form>
      {edit ? null : (
        <FormControl className={classes.formControl}>
          <Button
            type="button"
            style={{ width: "50%", margin: "0 auto" }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button>
        </FormControl>
      )}
      {edit ? (
        <FormControl className={classes.formControl}>
          <Button
            type="button"
            style={{ width: "50%", margin: "0 auto" }}
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </FormControl>
      ) : null}
      {isSocialLogin ? null : <ChangePassword />}
    </div>
  );
}
