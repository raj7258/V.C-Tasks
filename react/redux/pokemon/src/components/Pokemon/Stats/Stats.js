import React from "react";
import "./Stats.css";
import PropTypes from "prop-types";

class Stats extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps.data) === JSON.stringify(this.props.data)) {
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
      </div>
    );
  }
}

Stats.propTypes = {
  data: PropTypes.object,
};

export default Stats;
