import React, { useRef } from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { SET_USER_IMAGE_URL } from "../../../Api/ApiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  edit: {
    width: 25,
    height: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: "20px",
    color: "white",
    backgroundColor: "#1976d2",
    cursor: "pointer",
  },
}));

export default function ProfilePhoto() {
  const classes = useStyles();
  const inputRef = useRef(null);
  const token = useSelector((state) => state.userReducer.token);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  console.log(user.profileImg);
  const handlePhotoEdit = (event) => {
    let { files } = event.target;
    if (files.length) {
      let formData = new FormData();
      formData.append("userImg", event.target.files[0]);
      axios
        .post(SET_USER_IMAGE_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
          let { user } = response.data;
          dispatch(setUser(user));
        })
        .catch((err) => {
          console.log("error", err.reponse);
        });
    }
  };

  return (
    <div className={classes.root}>
      {/* <img alt={user.name} src={user.profileImg} /> */}
      <input
        ref={inputRef}
        type="file"
        onChange={handlePhotoEdit}
        accept="image/png, image/gif, image/jpeg"
        hidden
      />
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <>
            <div onClick={() => inputRef.current.click()}>
              <EditIcon className={classes.edit} fontSize="small" />
            </div>
          </>
        }
      >
        <Avatar
          alt={user.name}
          src={user.profileImg}
          className={classes.large}
        />
      </Badge>
    </div>
  );
}
