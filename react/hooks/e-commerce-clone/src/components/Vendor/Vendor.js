import React, { useState, useLayoutEffect } from "react";
// import AddProduct from "./AddProduct/AddProduct";
import NavBar from "../Navbar/NavBar";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { GET_VENDOR_URL } from "../../Api/ApiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAuthToken } from "../redux/actions/actions";
import { openNotification } from "../FormComponents/Notification/redux/actions/actions";
import Profile from "../Profile/Profile";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./Home/Home";

const Vendor = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [token] = useState(JSON.parse(localStorage.getItem("token")));
  // const xyz = useSelector((state) => state.userReducer);
  // console.log(xyz);
  let dispatch = useDispatch();
  let { path } = useRouteMatch();

  useLayoutEffect(() => {
    axios
      .get(GET_VENDOR_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { user } = res.data;
        console.log("in vendor", res);
        dispatch(setUser(user));
        dispatch(setAuthToken(token));
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
  }, [token, dispatch]);

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <NavBar user={user} />
        <Switch>
          <Route exact path="/vendor">
            <Home />
          </Route>
          <Route path={`${path}/profile`}>
            <Profile />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Vendor;
