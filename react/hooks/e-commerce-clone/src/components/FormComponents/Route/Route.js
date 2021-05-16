import React from "react";
import { Link } from "react-router-dom";
import './Route.css'

const Route = ({ info, text, path }) => {
  return (
    <div className="a-link">
      <p>{info}</p>
      <Link to={path}>{text}</Link>
    </div>
  );
};

export default Route;
