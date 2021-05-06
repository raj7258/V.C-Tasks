import { ADD_ITEMS, DELETE_ITEM, ON_SEARCH } from "./actionTypes";
import localForage from "localforage";

export const addItems = (items) => ({
  type: ADD_ITEMS,
  payload: items,
});

export const onSearch = (items) => ({
  type: ON_SEARCH,
  payload: items,
});

export const deleteItemAction = (items) => ({
  type: DELETE_ITEM,
  payload: items,
});

export const deleteItem = (id) => (dispatch, getState) => {
  const { items } = getState();
  const newItems = items.filter((items) => {
    return items.id !== id;
  });
  localForage.setItem("items", newItems).then(() => {
    dispatch(deleteItemAction(newItems));
  });
};
