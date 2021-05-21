import React from "react";
import "./NavBar.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Menu, MenuItem } from "@material-ui/core";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { LOGOUT_URL } from "../../Api/ApiRoutes";
import { useDispatch } from "react-redux";
import { openNotification } from "../FormComponents/Notification/redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({ user }) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let { url } = useRouteMatch();
  const handleProfile = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(LOGOUT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAnchorEl(null);
        history.push("/");
        dispatch(
          openNotification({
            text: "Logout successful",
            severity: "success",
            show: true,
          })
        );
      })
      .catch((err) => {
        console.log("error", err.response);
        dispatch(
          openNotification({
            text: "Something Went Wrong",
            severity: "error",
            show: true,
          })
        );
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {user.name}
          </Typography>
          <AccountCircleIcon
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <Link
                to="/vendor"
                style={{ textDecoration: "none", color: "black" }}
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfile}>
              <Link
                to={`${url}/profile`}
                style={{ textDecoration: "none", color: "black" }}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
