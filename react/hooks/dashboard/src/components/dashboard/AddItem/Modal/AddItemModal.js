import React from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import "./AddItemModal.css";

const AddItemModal = ({ showModal, closeModal }) => {
  const divStyle = { display: showModal ? "block" : "none" };

  // const handleClose = (event) => {
  //   event.stopPropagation();
  //   closeModal();
  // };

  return (
    <div className="modal" style={divStyle}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <AddItemForm closeModal={closeModal} />
      </div>
    </div>
  );
};
export default AddItemModal;
