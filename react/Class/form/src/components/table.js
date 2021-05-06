import react from "react";
import "./table.css";

class Table extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      currentPage: 1,
      dataperPage: 3,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("props", props);
    if (props.search) {
      props.searched();
      return {
        dataArray: [...props.data],
        currentPage: 1,
      };
    } else {
      return {
        dataArray: [...props.data],
      };
    }
  }

  onButtonPress = (event) => {
    let name = event.target.name;
    this.props.onclick(name);
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  onDropDownChange = (event) => {
    const value = event.target.value;
    this.setState({
      dataperPage: +value,
    });
    console.log("in dropdown", event.target.value);
  };

  onPrevious = () => {
    const pageNo = this.state.currentPage;
    if (+pageNo !== 1) {
      this.setState((state) => ({
        currentPage: state.currentPage - 1,
      }));
    }
    console.log("pageNo", pageNo);
  };

  onNext = (value) => {
    const pageNo = this.state.currentPage;
    if (pageNo !== value) {
      this.setState((state) => ({
        currentPage: state.currentPage + 1,
      }));
    }
    console.log("last value", value);
  };

  render() {
    const { dataArray, currentPage, dataperPage } = this.state;
    const indexOfLastTodo = currentPage * dataperPage;
    const indexOfFirstTodo = indexOfLastTodo - dataperPage;
    const currentData = dataArray.slice(indexOfFirstTodo, indexOfLastTodo);

    const row = currentData.map((data, index) => {
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.age}</td>
          <td>{data.gender}</td>
          <td>{data.city}</td>
        </tr>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataArray.length / dataperPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <button name="id" onClick={this.onButtonPress}>
                  ID
                </button>
              </th>
              <th>
                <button name="name" onClick={this.onButtonPress}>
                  Name
                </button>
              </th>
              <th>
                <button name="age" onClick={this.onButtonPress}>
                  Age
                </button>
              </th>
              <th>
                <button name="gender" onClick={this.onButtonPress}>
                  Gender
                </button>
              </th>
              <th>
                <button name="city" onClick={this.onButtonPress}>
                  City
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
        <ul className="pageNo">{renderPageNumbers}</ul>

        <div style={{ display: "flex" }}>
          <button onClick={this.onPrevious}>Previous</button>
          <button
            onClick={() => this.onNext(pageNumbers[pageNumbers.length - 1])}
          >
            Next
          </button>
        </div>

        <br />
        <br />
        <label htmlFor="DataPerPage">Data Per Page:</label>
        <select id="DataPerPage" onChange={this.onDropDownChange}>
          <option value="">Select</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    );
  }
}

export default Table;
