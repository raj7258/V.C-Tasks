import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SEARCH_EXPENSE,
  EDIT_BUDGET_AMOUNT,
  ON_EDIT_CLICK
} from "./actionTypes";

export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

export const removeExpense = (expense) => {
  return {
    type: DELETE_EXPENSE,
    payload: expense,
  };
};

export const searchExpense = (searchedTerm) => {
  return {
    type: SEARCH_EXPENSE,
    payload: searchedTerm,
  };
};

export const editBudgetAmount = (amount) => {
  return {
    type: EDIT_BUDGET_AMOUNT,
    payload: amount,
  };
};

export const onEditClick = () => {
  return {
    type: ON_EDIT_CLICK,
  };
};
