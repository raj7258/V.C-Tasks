import React from "react";
import { connect } from "react-redux";
import "./table.css";
import { deleteTask, editTask } from "../redux/actions";

class TaskList extends React.Component {
  onTaskEdit = (event, task) => {
    const newStatus = event.target.value;
    this.props.onTaskEdit(task, newStatus);
  };

  render() {
    let tasks = this.props.tasks;
    let list = tasks.map((task, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{task.title}</td>
          <td>{task.status}</td>
          <td>
            <select
              name="Status"
              onChange={(event) => this.onTaskEdit(event, task)}
              value={task.status}
            >
              <option value="">Select</option>
              <option value="new">New</option>
              <option value="in-progress">In-Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </td>
          <td>
            <button
              onClick={() => {
                this.props.onDelete(task);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        Total Task:{tasks.length}
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>name</th>
              <th>status</th>
              <th>Change</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (task) => dispatch(deleteTask(task)),
    onTaskEdit: (task, newStatus) => dispatch(editTask(task, newStatus)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
