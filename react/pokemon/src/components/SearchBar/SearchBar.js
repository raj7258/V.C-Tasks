import React from "react";
import "./SearchBar.css";
import { TextField } from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        this.setState({
          list: [...response.data.results],
        });
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  onInputChange = (event, value) => {
    this.props.onSearch(value);
  };

  render() {
    return (
      <div>
        <Autocomplete
          id="Pokémon"
          options={this.state.list}
          getOptionLabel={(option) => option.name}
          style={{ width: "100%" }}
          onChange={(event, value) => this.onInputChange(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter Pokémon"
              variant="outlined"
              className="input"
            />
          )}
        />
      </div>
    );
  }
}

export default SearchBar;
