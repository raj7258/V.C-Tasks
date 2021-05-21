import { SET_USER, SET_AUTH_TOKEN } from "../actions/actionTypes";

const initState = {
  user: {},
  token: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
