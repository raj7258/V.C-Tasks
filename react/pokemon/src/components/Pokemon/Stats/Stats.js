import React from "react";
import "./Stats.css";

class Stats extends React.Component {
  onSave = () => {
    this.props.onSave(this.props.data);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data.name) {
      return false;
    }
    return true;
  }

  render() {
    console.log("props in stats", this.props.data);
    let items = this.props.data.stats;
    let renderedList = items.map((item, index) => {
      return (
        <div key={index} className="stat">
          {item.base_stat}
          <p>{item.stat.name}</p>
        </div>
      );
    });

    return (
      <div>
        <div className="stats-div">{renderedList}</div>
        <button className="save-pokemon-btn" onClick={this.onSave}>
          Save Pokémon
        </button>
      </div>
    );
  }
}

export default Stats;
