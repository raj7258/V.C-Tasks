import { SONG_SELECTED } from "../types";
import { combineReducers } from "redux";
const songsReducer = () => {
  return [
    { title: "song", duration: "2:08" },
    { title: "abc", duration: "45:12" },
    { title: "xyz", duration: "12:08" },
    { title: "pqr", duration: "8:08" },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === SONG_SELECTED) {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});
