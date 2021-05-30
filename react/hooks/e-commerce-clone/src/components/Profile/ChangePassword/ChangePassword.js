import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { CHANGE_PASSWORD_URL } from "../../../Api/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "../../FormComponents/Notification/redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40%",
  },
  inputs: {
    width: "60%",
    margin: "0 auto",
    marginBottom: "20px",
    height: "10%",
  },
  buttons: {
    width: "30%",
    margin: "0 auto",
    marginBottom: "20px",
  },
  formControl: {
    minWidth: "100%",
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showPassword, setPasswordVisibility] = useState(false);
  const [showConfirmPassword, setConfirmPasswordVisibility] = useState(false);
  const [showCurrentPassword, setCurrentPasswordVisibility] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState({
    currentPasswordError: { helperText: "", errorStatus: false },
    newPasswordError: { helperText: "", errorStatus: false },
    confirmNewPasswordError: { helperText: "", errorStatus: false },
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setError({
      currentPasswordError: { helperText: "", errorStatus: false },
      newPasswordError: { helperText: "", errorStatus: false },
      confirmNewPasswordError: { helperText: "", errorStatus: false },
    });
  };

  const handleShowCurrentPassword = () => {
    setCurrentPasswordVisibility(!showCurrentPassword);
  };

  const handleShowPassword = () => {
    setPasswordVisibility(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmPasswordVisibility(!showConfirmPassword);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "currentPassword":
        if (value.length >= 8) {
          setPasswords({
            ...passwords,
            currentPassword: value,
          });
          setError({
            ...error,
            currentPasswordError: {
              helperText: "",
              errorStatus: false,
            },
          });
        } else {
          setPasswords({
            ...passwords,
            currentPassword: value,
          });
          setError({
            ...error,
            currentPasswordError: {
              helperText: "Password Must Be Of 8 Character",
              errorStatus: true,
            },
          });
        }

        break;

      case "newPassword":
        if (value.length >= 8) {
          setPasswords({
            ...passwords,
            newPassword: value,
          });
          setError({
            ...error,
            newPasswordError: {
              helperText: "",
              errorStatus: false,
            },
          });
        } else {
          setPasswords({
            ...passwords,
            newPassword: value,
          });
          setError({
            ...error,
            newPasswordError: {
              helperText: "Password Must Be Of 8 Character",
              errorStatus: true,
            },
          });
        }

        break;
      case "confirmNewPassword":
        if (value !== newPassword) {
          setPasswords({
            ...passwords,
            confirmNewPassword: value,
          });
          setError({
            ...error,
            confirmNewPasswordError: {
              helperText: "Confirm Password Must Be Same As Password",
              errorStatus: true,
            },
          });
        } else {
          setPasswords({
            ...passwords,
            confirmNewPassword: value,
          });
          setError({
            ...error,
            confirmNewPasswordError: {
              helperText: "",
              errorStatus: false,
            },
          });
        }
        setPasswords({
          ...passwords,
          confirmNewPassword: value,
        });
        break;
      default:
        setPasswords(passwords);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !currentPasswordError.errorStatus &&
      !newPasswordError.errorStatus &&
      !confirmNewPasswordError.errorStatus
    ) {
      const formData = { ...passwords };
      console.log("formdata", formData);
      delete formData.confirmNewPassword;
      axios
        .post(CHANGE_PASSWORD_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setOpen(false);
          dispatch(
            openNotification({
              text: "Password Changed!",
              severity: "success",
              show: true,
            })
          );
        })
        .catch((err) => {
          if (err.response) {
            let { message } = err.response.data;
            console.log(message);
            setError({
              ...error,
              currentPasswordError: {
                helperText: message,
                errorStatus: true,
              },
            });
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
  let { currentPassword, newPassword, confirmNewPassword } = passwords;
  let { currentPasswordError, newPasswordError, confirmNewPasswordError } =
    error;

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="outlined"
        color="primary"
        className={classes.buttons}
      >
        Change Password
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
              <h2>Change Password</h2>
              <FormControl className={classes.formControl}>
                <TextField
                  type={showCurrentPassword ? "text" : "password"}
                  className={classes.inputs}
                  variant="outlined"
                  label="Current Password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleChange}
                  helperText={currentPasswordError.helperText}
                  error={currentPasswordError.errorStatus}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {showCurrentPassword ? (
                          <div
                            onClick={handleShowCurrentPassword}
                            className="show-password-icon"
                          >
                            <VisibilityOffIcon />
                          </div>
                        ) : (
                          <div
                            onClick={handleShowCurrentPassword}
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
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  label="New Password"
                  variant="outlined"
                  value={newPassword}
                  className={classes.inputs}
                  onChange={handleChange}
                  helperText={newPasswordError.helperText}
                  error={newPasswordError.errorStatus}
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
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  name="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmNewPassword}
                  className={classes.inputs}
                  onChange={handleChange}
                  helperText={confirmNewPasswordError.helperText}
                  error={confirmNewPasswordError.errorStatus}
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
              </FormControl>

              <FormControl className={classes.formControl}>
                <Button
                  type="submit"
                  className={classes.buttons}
                  onClick={handleOpen}
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Button
                  className={classes.buttons}
                  onClick={handleClose}
                  color="secondary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
