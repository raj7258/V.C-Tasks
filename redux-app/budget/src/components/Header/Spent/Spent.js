import React from "react";

class Spent extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-primary" role="alert">
          {`Spent So Far:$${this.props.spentBudget}`}
        </div>
      </div>
    );
  }
}

export default Spent;
