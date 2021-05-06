import { ADD_ITEMS, DELETE_ITEM, ON_SEARCH } from "../actions/actionTypes";

const initState = {
  items: [],
  copyArray: [],
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      return {
        ...state,
        items: action.payload,
        copyArray: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: action.payload,
        copyArray: action.payload,
      };
    case ON_SEARCH:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
