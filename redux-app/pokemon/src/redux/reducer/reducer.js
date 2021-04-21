import {
  SAVED_FETCHED_POKEMON,
  SET_COPYLIST_AFTER_SEARCH,
  SET_SELECTED_POKEMON,
  SET_SEARCH_OBJECT,
  ON_SAVE_POKEMON,
  ON_DELETE_POKEMON,
} from "../actions/actionTypes";

const initState = {
  savedPokemon: [],
  selectedPokemon: null,
  count: 0,
  searchedObject: {},
  copyList: [],
  list: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SAVED_FETCHED_POKEMON:
      return {
        ...state,
        copyList: [...action.payload],
        list: [...action.payload],
      };
    case SET_COPYLIST_AFTER_SEARCH:
      return {
        ...state,
        copyList: [...action.payload],
      };
    case SET_SEARCH_OBJECT:
      return {
        ...state,
        searchedObject: action.payload,
      };

    case SET_SELECTED_POKEMON:
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    case ON_SAVE_POKEMON:
      return {
        ...state,
        savedPokemon: [...action.payload],
        count: state.count + 1,
      };
    case ON_DELETE_POKEMON:
      return {
        ...state,
        savedPokemon: [...action.payload],
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default reducer;
