import react from "react";
import Table from "./components/table";

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tasks: [],
    };
  }

  onInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      text: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    let obj = {
      id: Date.now(),
      taskName: this.state.text,
      taskStatus: "new",
    };
    this.setState((state) => ({
      text: "",
      tasks: [...state.tasks, obj],
    }));
  };

  onStatusChangeInTable = (id, value) => {
    let taskList = [...this.state.tasks];
    let selectedTask = taskList.find((task) => {
      return task.id === id;
    });
    selectedTask.taskStatus = value;
    this.setState({
      tasks: taskList,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Task Name</label>
          <input
            type="text"
            onChange={this.onInputChange}
            value={this.state.text}
          />
          <button type="submit">Add</button>
        </form>
        <Table
          tasks={this.state.tasks}
          onStatusChange={this.onStatusChangeInTable}
        />
      </div>
    );
  }
}

export default App;
