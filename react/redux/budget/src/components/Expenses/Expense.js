import React from "react";
import { connect } from "react-redux";
import "./Expense.css";
import { removeExpense, searchExpense } from "../../redux/actions/action";

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedTerm: "",
    };
  }
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      searchedTerm: value,
    });
    this.props.onSearch(value);
  };

  onDelete = (event, expense) => {
    event.preventDefault();
    this.props.onDelete(expense);
  };

  render() {
    let expensesList = this.props.expensesList.map((expense, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="wrap">
            <p>{expense.name.toUpperCase()}</p>
            <div className="price">
              <p>{`$${expense.cost}`}</p>
              <div>
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={(event) => this.onDelete(event, expense)}
                ></i>
              </div>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div>
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <h2>Expenses</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <input
                className="form-control"
                type="text"
                placeholder="Type To Search"
                value={this.state.searchedTerm}
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <ul className="list-group">{expensesList}</ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    expensesList: state.copyExpenseList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (expense) => dispatch(removeExpense(expense)),
    onSearch: (searchedTerm) => dispatch(searchExpense(searchedTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
