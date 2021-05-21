import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from "./actionsType";

export const openNotification = (payload) => ({
  type: OPEN_NOTIFICATION,
  payload: payload,
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});
