import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItems, onSearch } from "../../redux/actions/action";

const SearchBar = ({SetCurrentPage}) => {
  const [searchedterm, setTerm] = useState("");
  const { copyArray } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    let { value } = event.target;
    SetCurrentPage(1)
    setTerm(value);
    let newArray = [];
    copyArray.filter((x) => {
      if (
        x.vaccineName.includes(value.toLowerCase()) ||
        x.vaccinePrice.toString().includes(value.toString()) ||
        x.vaccineCountry.includes(value.toLowerCase()) ||
        x.id.toString().includes(value.toString())
      ) {
        newArray.push(x);
      }
      return 1;
    });

    if (value !== "") {
      dispatch(onSearch([...newArray]));
    } else {
      dispatch(addItems([...copyArray]));
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <label>Search</label>
      <input type="text" onChange={onInputChange} value={searchedterm} />
    </div>
  );
};

export default SearchBar;
