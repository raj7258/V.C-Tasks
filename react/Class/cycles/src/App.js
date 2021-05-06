import react from "react";

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      color: "white",
    };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.onMousePositionChange);
  }

  componentWillUnmount() {
    console.log("in unmount");
    document.removeEventListener("mousemove", this.onMousePositionChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.x > prevState.y && prevState.color !== "yellow") {
      this.setState({
        color: "yellow",
      });
    } else if (prevState.y > prevState.x && prevState.color !== "green") {
      this.setState({
        color: "green",
      });
    }
  }

  onMousePositionChange = (event) => {
    let xCoorindinate = event.clientX;
    let yCoorindinate = event.clientY;
    console.log("x=", xCoorindinate, " y=", yCoorindinate);
    if (xCoorindinate > yCoorindinate) {
      this.setState({
        x: xCoorindinate,
        y: yCoorindinate,
      });
    } else {
      this.setState({
        x: xCoorindinate,
        y: yCoorindinate,
      });
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: this.state.color }}>
        <div>
          pageX:{this.state.x}
          <br />
          pageY:{this.state.y}
        </div>
      </div>
    );
  }
}

export default App;
