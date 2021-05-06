import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="img-div">
        <img
          src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554%27"
          alt="Pokemon Logo"
          width="220"
          height="80"
        />
        <h3>Select a Pokémon</h3>
      </div>
    );
  }
}

export default Header;
