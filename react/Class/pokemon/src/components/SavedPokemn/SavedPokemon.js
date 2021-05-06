import React from "react";
import PropTypes from "prop-types";
import "./SavedPokemon.css";

let backColor = [
  "#6f35fc",
  "rgba(242, 48, 48, 1)",
  "rgba(255, 76, 35, 1)",
  "#b6a136",
  "rgba(61, 153, 245, 1)",
  "rgba(121, 97, 242, 1)",
];

class SavedPokemon extends React.Component {
  onDelete = (event, pokemon) => {
    this.props.onDelete(pokemon);
  };

  emptyCards = () => {
    let x = [];
    for (let i = 0; i < 6 - this.props.pokemons.length; i++) {
      x.push(
        <div key={i}>
          <div
            className="root"
            style={{ backgroundColor: "#c1c8ca", color: "#3a5d9f" }}
          >
            <div>
              <p className="empty">Empty</p>
            </div>
          </div>
        </div>
      );
    }
    return x;
  };

  render() {
    console.log("render", this.props.pokemons);
    let cards = this.props.pokemons.map((pokemon, index) => {
      return (
        <div key={index}>
          <div className="root" style={{ backgroundColor: backColor[index] }}>
            <div
              className="delete-button"
              onClick={(event) => this.onDelete(event, pokemon)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt="Pokemon"
                className="pokemon"
              />
              <p className="name">{pokemon.name}</p>
              <div className="move">{pokemon.moves[0].move.name}</div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <h6 className="heading">Selected Squad</h6>

        <div className="cardDiv">
          {this.props.pokemons.length > 0 ? cards : null}
          {this.emptyCards()}
        </div>
      </>
    );
  }
}

SavedPokemon.propTypes = {
  pokemons: PropTypes.array,
  ondelete: PropTypes.func,
};

SavedPokemon.defaultProps = {
  pokemons: [],
  onDelete: function () {
    console.log("Default Delete Function");
  },
};

export default SavedPokemon;
