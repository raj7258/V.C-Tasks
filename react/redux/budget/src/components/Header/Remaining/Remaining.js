import React from "react";

class Remaining extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-success" role="alert">
          {`Remaining:$${this.props.remainingBudget}`}
        </div>
      </div>
    );
  }
}

export default Remaining;
