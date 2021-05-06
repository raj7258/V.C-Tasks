import React, { useState } from "react";
import "./SignUp.css";
import { Link, withRouter } from "react-router-dom";
import localForage from "localforage";
import Heading from "../Heading/Heading";

const SignUp = ({ history }) => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setData({
        ...data,
        name: value,
      });
    } else if (name === "email") {
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

    localForage
      .getItem("users")
      .then((value) => {
        if (value) {
          return localForage.setItem("users", [...value, { ...data }]);
        } else {
          return localForage.setItem("users", [data]);
        }
      })
      .then((value) => {
        setData({ name: "", email: "", password: "" });
        history.push("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="SignUp-div">
      <Heading>Register</Heading>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Submit</button>
        <Link to="/login">Back To Login</Link>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
