import React, { useState } from "react";
import "./EditItemModal.css";
import localForage from "localforage";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/actions/action";

const EditItemModal = ({ showModal, closeModal, item }) => {
  const [data, setData] = useState({
    vaccineName: item.vaccineName,
    vaccineCountry: item.vaccineCountry,
    vaccinePrice: item.vaccinePrice,
  });
  const dispatch = useDispatch();

  const divStyle = {
    display: showModal ? "block" : "none",
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "vaccine-name") {
      setData({
        ...data,
        vaccineName: value,
      });
    } else if (name === "country-name") {
      setData({
        ...data,
        vaccineCountry: value,
      });
    } else if (name === "price") {
      setData({
        ...data,
        vaccinePrice: Number(value),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localForage
      .getItem("items")
      .then((items) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === item.id) {
            items[i] = data;
            items[i].vaccineImage = item.vaccineImage;
            items[i].id = item.id;
            break;
          }
        }
        return localForage.setItem("items", items);
      })
      .then((items) => {
        dispatch(addItems(items));
        closeModal();
      });
  };
  const onClose = (event) => {
    event.stopPropagation();
    closeModal();
  };

  return (
    <div>
      <div className="modal" style={{ divStyle }} onClick={onClose}>
        <div
          className="modal-content"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="edit-item">
            <form onSubmit={handleSubmit}>
              <h3>Edit Vaccine Info</h3>
              <input
                name="vaccine-name"
                type="text"
                placeholder="vaccine-name"
                value={data.vaccineName}
                onChange={handleChange}
                required
              />
              <input
                name="country-name"
                type="text"
                placeholder="country-name"
                value={data.vaccineCountry}
                onChange={handleChange}
                required
              />
              <input
                name="price"
                type="number"
                placeholder="price"
                value={data.vaccinePrice}
                onChange={handleChange}
                required
              />
              <button type="submit">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
