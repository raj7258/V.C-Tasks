import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from "../actions/actionsType";

const initState = {
  show: false,
  severity: "success",
  text: "",
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return {
        show: true,
        severity: action.payload.severity,
        text: action.payload.text,
      };
    case CLOSE_NOTIFICATION:
      return {
        show: false,
        severity: state.severity,
        text: state.text,
      };
    default:
      return state;
  }
};

export default notificationReducer;
