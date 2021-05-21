import React from "react";
import ProfilePhoto from "./Avatar/Avatar";
import EditForm from "./EditForm/EditForm";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-div">
      <h2>Your Profile</h2>
      <ProfilePhoto />
      <EditForm />
    </div>
  );
};

export default Profile;
