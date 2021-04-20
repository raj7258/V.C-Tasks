import React from "react";
import { connect } from "react-redux";
import { selectSong } from "../actions/index";

class SongsList extends React.Component {
  onSongSelect = (event, song) => {
    this.props.onSongSelect(song);
  };
  renderList = () => {
    return this.props.songs.map((song) => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={(event) => this.onSongSelect(event, song)}
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  };

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStatesToProps = (state) => {
  return {
    songs: state.songs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSongSelect: (song) => dispatch(selectSong(song)),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(SongsList);
