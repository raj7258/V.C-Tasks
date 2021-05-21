import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification } from "./redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "0 auto",
    marginTop: "50px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    zIndex:"10"
  },
}));

function Notification(props) {
  const classes = useStyles();
  const state = useSelector((state) => state.notificationReducer);
  let dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <Collapse in={state.show}>
        <Alert
          severity={state.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeNotification());
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {state.text}
        </Alert>
      </Collapse>
    </div>
  );
}

export default React.memo(Notification);
