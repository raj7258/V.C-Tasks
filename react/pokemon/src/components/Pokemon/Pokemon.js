import React from "react";
import { Typography } from "@material-ui/core";
import "./Pokemon.css";
import Stats from "./Stats/Stats";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    let data = props.selectedPokemon;
    return { data: data };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.selectedPokemon.name === this.state.data.name) {
      return false;
    }
    return true;
  }
  
  render() {
    console.log("state", this.state);
    return (
      <div>
        <Typography variant="h5" className="selected">
          Selected Pokémon
        </Typography>

        <div className="about">
          <img
            alt="Pokemon"
            src={this.state.data.sprites.front_default}
            height="100"
            width="100"
          />
          <Typography variant="h6">{this.state.data.name}</Typography>
        </div>

        <Stats data={this.state.data} onSave={this.props.onSave} />
      </div>
    );
  }
}

export default Pokemon;
