import React from "react";
import { connect } from "react-redux";
import { addExpense } from "../../redux/actions/action";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cost: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "name") {
      this.setState({
        name: value,
      });
    } else {
      this.setState({
        cost: +value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    this.props.onSubmit({ ...this.state, id });
    this.setState({
      name: "",
      cost: "",
    });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <h2>Add Expense</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.name}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Cost</label>
                  <input
                    name="cost"
                    type="number"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.cost.toString()}
                    required
                  />
                </div>
              </div>
              <div
                className="col-md-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (expense) => dispatch(addExpense(expense)),
  };
};

export default connect(null, mapDispatchToProps)(AddExpense);
