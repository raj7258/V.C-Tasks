import { SET_USER, SET_AUTH_TOKEN } from "./actionTypes";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setAuthToken = (payload) => ({
  type: SET_AUTH_TOKEN,
  payload,
});
