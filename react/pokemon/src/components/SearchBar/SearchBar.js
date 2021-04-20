import React from "react";
import "./SearchBar.css";
import axios from "axios";
import PropTypes from "prop-types";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedTerm: "",
      copyList: [],
      list: [],
      show: false,
      cursor: -1,
      scrollPosition: -8,
    };
    this.ULRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        this.setState({
          list: [...response.data.results],
          copyList: [...response.data.results],
        });
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return false;
    }
    return true;
  }

  searchedList = (value) => {
    let List = this.state.list;
    const searchedData = List.filter((obj) => {
      return obj.name.toLowerCase().includes(value.toLowerCase());
    });
    return searchedData;
  };

  filterOnSubmit = (value) => {
    let List = this.state.list;
    const searchedData = List.filter((obj) => {
      return obj.name.toLowerCase() === value.toLowerCase();
    });
    return searchedData;
  };

  onInputChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { value } = event.target;
    let newList = this.searchedList(value);
    this.setState({
      searchedTerm: value,
      copyList: newList,
      cursor: -1,
      scrollPosition: -8,
      show: true,
    });
    if (value === "") {
      this.setState({
        searchedTerm: value,
        copyList: this.state.list,
        cursor: -1,
        scrollPosition: -8,
      });
    }
  };

  onInputClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let text = this.state.searchedTerm;
    if (!text) {
      this.setState({
        show: !this.state.show,
      });
    } else if (text) {
      this.setState({
        show: true,
      });
    }
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let newList = this.filterOnSubmit(this.state.searchedTerm);
    this.props.onSearch(newList[0]);
  };

  onClear = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    this.setState({
      searchedTerm: "",
      copyList: this.state.list,
      cursor: -1,
      scrollPosition: -8,
    });
    this.inputRef.current.focus();
  };

  onOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    this.setState({
      show: this.state.show ? false : true,
      cursor: -1,
      scrollPosition: -8,
    });
    this.inputRef.current.focus();
  };

  onNameClick = (event, obj) => {
    event.preventDefault();
    event.stopPropagation();
    let newList = this.searchedList(obj.name);
    this.setState({
      searchedTerm: obj.name,
      copyList: newList,
    });
    this.props.onSearch(obj);
  };

  onKeyDown = (event) => {
    const { cursor, copyList } = this.state;
    let refrence = this.ULRef.current;

    if (event.keyCode === 38 && cursor > 0) {
      this.setState(
        (prevState) => ({
          cursor: prevState.cursor - 1,
          scrollPosition: prevState.scrollPosition - 10,
        }),
        () => {
          if (this.state.show) {
            refrence.scrollTop = this.state.scrollPosition * 3;
          }
        }
      );
    } else if (event.keyCode === 40 && cursor < copyList.length - 1) {
      this.setState(
        (prevState) => ({
          cursor: prevState.cursor + 1,
          scrollPosition: prevState.scrollPosition + 10,
        }),
        () => {
          if (this.state.show) {
            refrence.scrollTop = this.state.scrollPosition * 3;
          }
        }
      );
    } else if (event.keyCode === 13 && cursor !== -1) {
      let newPokemon = copyList[cursor];
      this.setState({
        searchedTerm: newPokemon.name,
        copyList: [newPokemon],
        cursor: 0,
      });
    }
  };

  render() {
    const { cursor } = this.state;
    console.log("searchbar");
    let pokemonNames = this.state.copyList.map((list, index) => {
      return (
        <li key={list.url} onClick={(event) => this.onNameClick(event, list)}>
          <div className={cursor === index ? "active" : null}>{list.name}</div>
        </li>
      );
    });

    let nameList = this.state.show ? (
      <ul className="pokemon-list" ref={this.ULRef}>
        {pokemonNames}
      </ul>
    ) : null;

    let arrrowIcon = this.state.show ? "fa fa-angle-up" : "fa fa-angle-down";

    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label className="search-label">
            <input
              className="input"
              placeholder="Filter Pokémon"
              onChange={this.onInputChange}
              value={this.state.searchedTerm}
              onClick={this.onInputClick}
              onKeyDown={this.onKeyDown}
              ref={this.inputRef}
            />
            <i
              className="fa fa-times clear"
              onClick={this.onClear}
              style={{ fontSize: 20 }}
            ></i>
            <i
              className={`${arrrowIcon} open`}
              style={{ fontSize: 30 }}
              onClick={this.onOpen}
            ></i>
          </label>
          <div>{nameList}</div>
        </form>
      </div>
    );
  }
}
SearchBar.defaultProps = {
  onSearch: function () {
    console.log("this is the default Search Function");
  },
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
