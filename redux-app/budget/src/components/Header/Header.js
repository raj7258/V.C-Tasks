import React from "react";
import Budget from "./Budget/Budget";
import Remaining from "./Remaining/Remaining";
import Spent from "./Spent/Spent";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div style={{textAlign:"center",margin:"40px 0"}}>
          <h1>My Budget Planner</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Budget/>
            </div>
            <div className="col-md-4">
              <Remaining remainingBudget={this.props.remainingBudget} />
            </div>
            <div className="col-md-4">
              <Spent spentBudget={this.props.spentBudget} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    remainingBudget: state.remainingBudget,
    spentBudget: state.spentBudget,
  };
};

export default connect(mapStateToProps)(Header);
