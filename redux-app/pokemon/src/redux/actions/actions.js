import {
  SAVED_FETCHED_POKEMON,
  SET_COPYLIST_AFTER_SEARCH,
  SET_SEARCH_OBJECT,
  SET_SELECTED_POKEMON,
  ON_SAVE_POKEMON,
  ON_DELETE_POKEMON,
} from "../actions/actionTypes";
import axios from "axios";

const containsObject = (obj, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === obj.name) {
      return false;
    }
  }

  return true;
};

export const saveFetchedPokemon = (payload) => {
  return {
    type: SAVED_FETCHED_POKEMON,
    payload: payload,
  };
};

export const setCopyListAfterSearch = (payload) => {
  return {
    type: SET_COPYLIST_AFTER_SEARCH,
    payload: payload,
  };
};

export const setSearchedObject = (payload) => {
  return {
    type: SET_SEARCH_OBJECT,
    payload: payload,
  };
};

export const setSelectedPokemon = (payload) => {
  return {
    type: SET_SELECTED_POKEMON,
    payload: payload,
  };
};

export const onSavePokemon = (pokemons) => {
  return {
    type: ON_SAVE_POKEMON,
    payload: pokemons,
  };
};

export const onDeletePokemon = (pokemons) => {
  return {
    type: ON_DELETE_POKEMON,
    payload: pokemons,
  };
};

export const onDelete = (value) => {
  return (dispatch, getState) => {
    let state = getState();
    let savedPokemons = state.savedPokemon;
    let newList = savedPokemons.filter((Pokemon) => {
      return Pokemon.name !== value.name;
    });
    dispatch(onDeletePokemon(newList));
  };
};

export const onSave = (savedData) => {
  return (dispatch, getState) => {
    let state = getState();
    if (containsObject(savedData, state.savedPokemon) && state.count < 6) {
      let pokemons = state.savedPokemon;
      let index = state.count;
      pokemons[index] = savedData;
      dispatch(onSavePokemon(pokemons));
    }
  };
};

export const onSearch = (value) => {
  return (dispatch, getState) => {
    let state = getState();
    if (value && state.searchedObject.name !== value.name) {
      dispatch(setSearchedObject(value));
      axios.get(value.url).then((response) => {
        dispatch(setSelectedPokemon(response.data));
      });
    }
  };
};

export const fetchPokemon = () => {
  return (dispatch) => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        dispatch(saveFetchedPokemon([...response.data.results]));
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
};
