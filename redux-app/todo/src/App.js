import React from "react";
import Form from "./components/Form";
import TaskList from "./components/TaskList";

const App = (props) => {
  return (
    <div>
      <Form />
      <TaskList />
    </div>
  );
};

export default App;
