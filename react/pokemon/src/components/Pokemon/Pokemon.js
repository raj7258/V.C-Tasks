import React from "react";
import "./Pokemon.css";
import Stats from "./Stats/Stats";
import PropTypes from "prop-types";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisaled: false,
      message: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    function containsObject(obj, list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].name === obj.name) {
          return false;
        }
      }

      return true;
    }

    if (containsObject(props.selectedPokemon, props.pokemonInSquad) === false) {
      return {
        buttonDisaled: true,
      };
    } else {
      return {
        buttonDisaled: false,
      };
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.selectedPokemon.name === this.props.selectedPokemon.name &&
      nextProps.pokemonInSquad.length === this.props.pokemonInSquad
    ) {
      return false;
    }
    return true;
  }

  onSave = () => {
    this.props.onSave(this.props.selectedPokemon);
  };

  render() {
    console.log("in pokemon", this.props.pokemonInSquad);
    let data = this.props.selectedPokemon;
    let buttonName =
      this.props.pokemonInSquad.length === 6
        ? "Squad Is Full"
        : this.state.buttonDisaled
        ? "Pokémon In Squad"
        : "Save Pokémon";

    return (
      <div>
        <h5 className="selected">Selected Pokémon</h5>

        <div className="about">
          <img
            alt="Pokemon"
            src={data.sprites.front_default}
            height="100"
            width="100"
          />
          <h6>{data.name}</h6>
        </div>

        <Stats data={data} />

        <button
          className={
            this.state.buttonDisaled || this.props.pokemonInSquad.length === 6
              ? "save-pokemon-btn-disable"
              : "save-pokemon-btn-enable"
          }
          onClick={this.onSave}
          disabled={this.state.buttonDisaled}
        >
          {buttonName}
        </button>
      </div>
    );
  }
}

Pokemon.defaultProps = {
  onSave: function () {
    console.log("this is the default Save Function");
  },
  selectedPokemon: {
    name: "default name",
    sprites: {
      front_default:
        "https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554%27",
    },
    stats: [
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: "default",
        effort: 0,
        stat: {
          name: "defalut name",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
    ],
  },
};

Pokemon.propTypes = {
  selectedPokemon: PropTypes.object,
  onSave: PropTypes.func,
};

export default Pokemon;
