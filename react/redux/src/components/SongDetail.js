import React from "react";
import { connect } from "react-redux";

class SongDetail extends React.Component {
  render() {
    let song = this.props.selectedSong;
    console.log("selectedSong", this.props.selectedSong);
    return (
      <div>
        {song ? (
          <div>
            <h3>"Detail For:"</h3>
            <p>
              "Title:"{song.title} <br />
              "Duration:"{song.duration}
            </p>
          </div>
        ) : (
          "Select a Song"
        )}
      </div>
    );
  }
}
const mapStatesToProps = (state) => {
  return {
    selectedSong: state.selectedSong,
  };
};
export default connect(mapStatesToProps)(SongDetail);
