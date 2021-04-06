import React from "react";
import "./square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  onSquareClick = (event, value) => {
    console.log("value", value);
    this.setState({
      value: value,
    });
  };
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
