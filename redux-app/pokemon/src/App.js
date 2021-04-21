import { connect } from "react-redux";
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Pokemon from "./components/Pokemon/Pokemon";
import SavedPokemon from "./components/SavedPokemn/SavedPokemon";
import SearchBar from "./components/SearchBar/SearchBar";

class App extends React.Component {
  render() {
    let pokemonData = this.props.selectedPokemon ? (
      <Pokemon
        selectedPokemon={this.props.selectedPokemon}
        pokemonInSquad={this.props.savedPokemon}
      />
    ) : null;

    let cards = this.props.selectedPokemon ? (
      <SavedPokemon pokemons={this.props.savedPokemon} />
    ) : null;

    return (
      <div className="main-div">
        <Header />
        <SearchBar />
        {pokemonData}
        {cards}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    savedPokemon: state.savedPokemon,
    selectedPokemon: state.selectedPokemon,
    count: state.count,
    searchedObject: state.searchedObject,
  };
};

export default connect(mapStateToProps)(App);
