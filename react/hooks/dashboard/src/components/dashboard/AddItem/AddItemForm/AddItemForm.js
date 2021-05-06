import React, { useState, useRef } from "react";
import "./AddItemForm.css";
import localForage from "localforage";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/actions/action";

const AddItemForm = ({ closeModal }) => {
  const formRef = useRef(null);
  const [data, setData] = useState({
    vaccineName: "",
    vaccineCountry: "",
    vaccinePrice: "",
    vaccineImage: "",
  });
  const dispatch = useDispatch();
  const id = () => {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
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

  const handleFileChange = (event) => {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setData({
          ...data,
          vaccineImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localForage
      .getItem("items")
      .then((value) => {
        if (value) {
          return localForage.setItem("items", [
            ...value,
            { ...data, id: id() },
          ]);
        } else {
          return localForage.setItem("items", [{ ...data, id: id() }]);
        }
      })
      .then((value) => {
        formRef.current.reset();
        setData({
          vaccineName: "",
          vaccineCountry: "",
          vaccinePrice: "",
          vaccineImage: "",
        });
        closeModal();
        dispatch(addItems(value));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleClose = () => {
    formRef.current.reset();
    setData({
      vaccineName: "",
      vaccineCountry: "",
      vaccinePrice: "",
      vaccineImage: "",
    });
    closeModal();
  };

  return (
    <div className="add-item">
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h3>Add Vaccine</h3>
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
        <input
          type="file"
          max="1"
          name="myImage"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={handleFileChange}
          required
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};
export default AddItemForm;
