import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState({
    name: "raj",
    age: 18,
  });
  function onAdd() {
    setCount(count + 1);
  }
  useEffect(() => {
    console.log("in effect");
    return () => {
      console.log("cleanUp Function");
    };
  });
  console.log("info", info);
  return (
    <div>
      <button onClick={() => setInfo({ ...info, age: 10 })}>-</button>
      {count}
      <button onClick={onAdd}>+</button>
    </div>
  );
};

export default App;
