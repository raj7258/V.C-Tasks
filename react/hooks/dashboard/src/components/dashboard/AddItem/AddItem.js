import React, { useState } from "react";
import "./AddItem.css";
import AddItemModal from "./Modal/AddItemModal";

const AddItem = () => {
  const [modal, setModal] = useState(false);

  const handleAddItem = () => {
    setModal(!modal);
  };

  return (
    <div className="add-item-div">
      <button onClick={handleAddItem}>Add Vaccine</button>
      <AddItemModal showModal={modal} closeModal={handleAddItem} />
    </div>
  );
};

export default AddItem;
