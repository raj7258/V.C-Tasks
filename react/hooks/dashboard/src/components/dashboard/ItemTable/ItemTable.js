import React, { useState, useRef, useEffect } from "react";
import "./ItemTable.css";
import { addItems, deleteItem } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./Searchbar/Searchbar";
import localForage from "localforage";
import EditItemModal from "./EditItemModal/EditItemModal";

let j = 1;

const ItemTable = () => {
  const { items, copyArray } = useSelector((state) => state);
  const [currentPage, SetCurrentPage] = useState(1);
  const [dataPerPage] = useState(3);
  const updateImageRef = useRef([]);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
    updateImageRef.current = updateImageRef.current.slice(0, items.length);
  }, [items.length]);

  const handleSorting = (event) => {
    const { name } = event.target;
    let specificField = name;
    j = j * -1;
    let newDataArray = [...items];
    newDataArray.sort((a, b) => {
      if (a[specificField] < b[specificField]) {
        return -1 * j;
      }
      if (a[specificField] > b[specificField]) {
        return 1 * j;
      }
      return 0;
    });
    dispatch(addItems(newDataArray));
  };

  const handleDelete = (event, id, index) => {
    if (index === 0 && currentPage !== 1) {
      SetCurrentPage(currentPage - 1);
    }
    dispatch(deleteItem(id));
  };

  const handleImageUpdate = (event, id) => {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        localForage
          .getItem("items")
          .then((items) => {
            for (let i = 0; i < items.length; i++) {
              if (items[i].id === id) {
                items[i].vaccineImage = reader.result;
                break;
              }
            }
            return localForage.setItem("items", items);
          })
          .then((items) => {
            console.log("update items", items);
            dispatch(addItems(items));
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (event, item) => {
    setShowEditModal(!showEditModal);
    setItemToEdit({ ...item });
  };

  const vaccineList = () => {
    const indexOfLastTodo = currentPage * dataPerPage;
    const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
    const currentData = items.slice(indexOfFirstTodo, indexOfLastTodo);
    const list = currentData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>
            <input
              type="file"
              max="1"
              name="myImage"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(event) => handleImageUpdate(event, item.id)}
              ref={(el) => (updateImageRef.current[index] = el)}
              hidden
              required
            />
            <img
              alt="Vaccine-img"
              src={item.vaccineImage}
              width="50"
              height="50"
              onClick={() => updateImageRef.current[index].click()}
            />
          </td>
          <td>{item.vaccineName}</td>
          <td>{item.vaccineCountry}</td>
          <td>{item.vaccinePrice}</td>
          <td>
            <div className="actions">
              <button onClick={(event) => handleEdit(event, item)}>Edit</button>
              <button onClick={(event) => handleDelete(event, item.id, index)}>
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
    return list;
  };

  const handlePageNoClick = (event) => {
    SetCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={handlePageNoClick}>
        {number}
      </li>
    );
  });

  return (
    <div className="itemTable">
      {copyArray.length > 0 ? (
        <>
          <SearchBar SetCurrentPage={SetCurrentPage} />
          <table>
            <thead>
              <tr>
                <th>
                  <button name="id" onClick={handleSorting}>
                    ID
                  </button>
                </th>
                <th>Image</th>
                <th>
                  <button name="vaccineName" onClick={handleSorting}>
                    Name
                  </button>
                </th>
                <th>
                  <button name="vaccineCountry" onClick={handleSorting}>
                    country
                  </button>
                </th>
                <th>
                  <button name="vaccinePrice" onClick={handleSorting}>
                    price
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{vaccineList()}</tbody>
          </table>
          <ul className="pageNo">{renderPageNumbers}</ul>

          {showEditModal ? (
            <EditItemModal
              showModal={showEditModal}
              closeModal={setShowEditModal}
              item={itemToEdit}
            />
          ) : null}
        </>
      ) : (
        "No Vaccine Data"
      )}
    </div>
  );
};

export default ItemTable;
