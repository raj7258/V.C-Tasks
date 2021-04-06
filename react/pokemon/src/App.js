import axios from "axios";
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Pokemon from "./components/Pokemon/Pokemon";
import SavedPokemon from "./components/SavedPokemn/SavedPokemon";
import SearchBar from "./components/SearchBar/SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedPokemon: [],
      selectedPokemon: null,
      count: 0,
    };
  }

  onSearch = (value) => {
    if (value) {
      axios
        .get(value.url)
        .then((response) => {
          this.setState({
            selectedPokemon: response.data,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  onSave = (savedData) => {
    function containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i].name === obj.name) {
          return false;
        }
      }

      return true;
    }

    if (
      containsObject(savedData, this.state.savedPokemon) &&
      this.state.count < 6
    ) {
      let pokemons = this.state.savedPokemon;
      let index = this.state.count;
      pokemons[index] = savedData;
      this.setState((state) => ({
        savedPokemon: pokemons,
        count: state.count + 1,
      }));
    }
  };

  render() {
    console.log("App State", this.state);
    let pokemonData = this.state.selectedPokemon ? (
      <Pokemon
        selectedPokemon={this.state.selectedPokemon}
        onSave={this.onSave}
      />
    ) : null;

    let cards =
      this.state.savedPokemon.length > 0 ? (
        <SavedPokemon pokemons={this.state.savedPokemon} />
      ) : null;

    return (
      <div className="main-div">
        <Header />
        <SearchBar onSearch={this.onSearch} />
        {pokemonData}
        {cards}
      </div>
    );
  }
}

export default App;
