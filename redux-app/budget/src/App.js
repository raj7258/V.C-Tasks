import React from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import Expense from "./components/Expenses/Expense";
import Header from "./components/Header/Header";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expense/>
        <AddExpense />
      </div>
    );
  }
}

export default App;
