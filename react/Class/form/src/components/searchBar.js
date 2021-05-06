import react from "react";

class SearchBar extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  onInputChange = async (event) => {
    let value = event.target.value;
    await this.setState({
      term: value,
    });
    this.props.onsearch(this.state.term);
  };

  render() {
    return (
      <div>
        <label>Search</label>
        <input
          type="text"
          onChange={this.onInputChange}
          value={this.state.term}
        />
      </div>
    );
  }
}

export default SearchBar;
