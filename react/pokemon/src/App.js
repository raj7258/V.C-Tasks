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
      searchedObject: {},
    };
  }

  containsObject = (obj, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === obj.name) {
        return false;
      }
    }

    return true;
  };

  onSearch = (value) => {
    if (value && this.state.searchedObject.name !== value.name) {
      this.setState({
        searchedObject: value,
      });
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
    if (
      this.containsObject(savedData, this.state.savedPokemon) &&
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

  onDelete = (value) => {
    let savedPokemons = this.state.savedPokemon;
    let newList = savedPokemons.filter((Pokemon) => {
      return Pokemon.name !== value.name;
    });
    this.setState({
      savedPokemon: newList,
      count: this.state.count - 1,
    });
  };

  render() {
    console.log("App State", this.state);

    let pokemonData = this.state.selectedPokemon ? (
      <Pokemon
        selectedPokemon={this.state.selectedPokemon}
        pokemonInSquad={this.state.savedPokemon}
        onSave={this.onSave}
      />
    ) : null;

    let cards = this.state.selectedPokemon ? (
      <SavedPokemon
        pokemons={this.state.savedPokemon}
        onDelete={this.onDelete}
      />
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
