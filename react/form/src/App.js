import react from "react";
import Table from "./components/table";
import Form from "./components/form";
import SearchBar from "./components/searchBar";

let j = 1;

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      originalData: [],
      search: false,
    };
  }

  onFormSubmit = (values) => {
    const obj = {
      ...values,
      id: Date.now(),
    };

    this.setState((state) => ({
      data: [...state.data, obj],
      originalData: [...state.data, obj],
    }));
  };

  onButtonClick = (name) => {
    let specificField = name;
    j = j * -1;
    let newDataArray = [...this.state.data];
    newDataArray.sort((a, b) => {
      if (a[specificField] < b[specificField]) {
        return -1 * j;
      }
      if (a[specificField] > b[specificField]) {
        return 1 * j;
      }
      return 0;
    });

    this.setState({
      data: [...newDataArray],
      originalData: [...newDataArray],
    });
  };

  onInputSearch = async (value) => {
    let newArray = [];
    this.state.originalData.filter((x) => {
      if (
        x.name.includes(value.toLowerCase()) ||
        x.age.toString().includes(value.toString()) ||
        x.city.includes(value.toLowerCase()) ||
        x.id.toString().includes(value.toString())
      ) {
        newArray.push(x);
      }
      return 1;
    });

    if (value !== "") {
      await this.setState({
        data: [...newArray],
        search: true,
      });
    } else {
      await this.setState((state) => ({
        data: [...state.originalData],
        search: true,
      }));
    }
  };
  fromTruetToFalse = () => [
    this.setState({
      search: false,
    }),
  ];

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit} />
        <br /> <br /> <br />
        <SearchBar onsearch={this.onInputSearch} />
        {this.state.data.length ? (
          <Table
            searched={this.fromTruetToFalse}
            data={this.state.data}
            onclick={this.onButtonClick}
            search={this.state.search}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
