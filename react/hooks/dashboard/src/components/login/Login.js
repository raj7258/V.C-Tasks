import React, { useState } from "react";
import "./Login.css";
import { Link, withRouter } from "react-router-dom";
import localForage from "localforage";
import Heading from "../Heading/Heading";

const LogIn = ({ history }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const validator = (users, user) => {
    let filteredUser = undefined;
    if (!users) {
      setError("No User Found");
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === user.email) {
        if (users[i].password === user.password) {
          filteredUser = users[i];
          setError("");
          break;
        } else {
          setError("Password Is InCorrect");
          break;
        }
      }
      if (filteredUser === undefined) {
        setError("No User Found");
      }
    }

    return filteredUser;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    if (name === "email") {
      setData({
        ...data,
        email: value,
      });
    } else {
      setData({
        ...data,
        password: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localForage.getItem("users").then((value) => {
      const user = validator(value, data);
      if (user) {
        setData({ email: "", password: "" });
        setError("");
        history.push({
          pathname: "/dashboard",
          state: user,
        });
      }
    });
  };

  return (
    <div className="login-div">
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
        {error ? <label className="error-message">{error}</label> : null}
        <button type="submit">Submit</button>
        <Link to="/">Back To SignUp</Link>
      </form>
    </div>
  );
};
export default withRouter(LogIn);
