import react from "react";
import "./table.css";

class Table extends react.Component {
  SelectedStatus = (e, id) => {
    const value = e.target.value;
    this.props.onStatusChange(id, value);
  };
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.taskName}</td>
                  <td>{task.taskStatus}</td>
                  <td>
                    <select
                      name="Status"
                      onChange={(e) => this.SelectedStatus(e, task.id)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option>new</option>
                      <option>InProgress</option>
                      <option>Done</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
