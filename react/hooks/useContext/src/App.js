import React from "react";
import Navbar from "./components/Navbar";
import { themes } from "./ColorContext";
import { ColorProvider } from "./ColorContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: themes.light,
      changeBgColor: this.changeBgColor,
    };
  }

  changeBgColor = () => {
    this.setState({
      bgColor: this.state.bgColor === themes.light ? themes.dark : themes.light,
    });
  };

  render() {
    return (
      <div>
        <ColorProvider value={this.state}>
          <Navbar />
        </ColorProvider>
      </div>
    );
  }
}

export default App;
