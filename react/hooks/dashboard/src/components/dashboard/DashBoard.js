import React, { useEffect } from "react";
import Heading from "../Heading/Heading";
import "./DashBoard.css";
import { withRouter, Redirect } from "react-router-dom";
import AddItem from "./AddItem/AddItem";
import ItemTable from "./ItemTable/ItemTable";
import { useDispatch } from "react-redux";
import localForage from "localforage";
import { addItems } from "../dashboard/redux/actions/action";

const DashBoard = ({ history, location }) => {
  const user = location.state;

  const dispatch = useDispatch();

  useEffect(() => {
    localForage.getItem("items").then((value) => {
      if (value) {
        dispatch(addItems(value));
      }
    });
  });

  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleLogOut = () => {
    history.replace();
  };

  return (
    <div>
      <div className="header">
        <Heading>Welcome {user.name}</Heading>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
      <AddItem />
      <ItemTable />
    </div>
  );
};

export default withRouter(DashBoard);
