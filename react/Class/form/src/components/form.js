import react from "react";

class Form extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      age: "",
      gender: "",
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: "",
      city: "",
      age: "",
      gender: "",
    });
  };

  onInputChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "name") {
      this.setState({
        name: value.toLowerCase(),
      });
    } else if (event.target.name === "city") {
      this.setState({
        city: value.toLowerCase(),
      });
    } else if (event.target.name === "gender") {
      this.setState({
        gender: event.target.value,
      });
    } else {
      this.setState({
        age: +value,
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Name</label>
          <textarea
            name="name"
            type="text"
            value={this.state.name}
            required
            onChange={this.onInputChange}
          />
          <label>city</label>
          <input
            name="city"
            type="text"
            value={this.state.city}
            required
            onChange={this.onInputChange}
          />
          <label>age</label>
          <input
            name="age"
            type="number"
            value={this.state.age}
            required
            onChange={this.onInputChange}
          />

          <p>Please select your gender:</p>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={this.state.gender === "male"}
            onChange={this.onInputChange}
          />
          <label htmlFor="male">Male</label>
          <br></br>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={this.state.gender === "female"}
            onChange={this.onInputChange}
          />
          <label htmlFor="female">Female</label>
          <br></br>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={this.state.gender === "other"}
            onChange={this.onInputChange}
          />
          <label htmlFor="other">Other</label>
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
