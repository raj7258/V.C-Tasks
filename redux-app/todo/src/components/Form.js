import React from "react";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      status: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      title: "",
      status: "",
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            className="input-bar"
            value={this.state.title}
            placeholder="Task Title"
            onChange={this.handleChange}
            required
          />
          <select
            name="status"
            required
            onChange={this.handleChange}
            value={this.state.progress}
          >
            <option value="">Select</option>
            <option value="new">New</option>
            <option value="in-progress">In-Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.tasks);
  return state;
};
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (task) => dispatch(addTask(task)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
