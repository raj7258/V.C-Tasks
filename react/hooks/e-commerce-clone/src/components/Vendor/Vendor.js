import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct/AddProduct";
import NavBar from "./Navbar/NavBar";
import { Redirect, useLocation } from "react-router-dom";

const Vendor = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  let location = useLocation();
  let { state } = location;

  useEffect(() => {
    setUser({ ...state.user });
    setToken(state.token);
  }, [state.token, state]);

  if (!state) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <NavBar user={user} token={token} />
      <h3>Vendor page</h3>
      <AddProduct user={user} token={token} />
    </div>
  );
};

export default Vendor;
