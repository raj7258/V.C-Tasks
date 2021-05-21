import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
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

  const handlePhotoEdit = () => {};

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <>
            <div onClick={handlePhotoEdit}>
              <EditIcon className={classes.edit} fontSize="small" />
            </div>
          </>
        }
      >
        <Avatar
          alt="Travis Howard"
          src="/static/images/avatar/2.jpg"
          className={classes.large}
        />
      </Badge>
    </div>
  );
}
