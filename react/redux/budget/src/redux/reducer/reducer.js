import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SEARCH_EXPENSE,
  EDIT_BUDGET_AMOUNT,
  ON_EDIT_CLICK,
} from "../actions/actionTypes";

const initState = {
  budget: 1000,
  remainingBudget: 1000,
  spentBudget: 0,
  expensesList: [],
  copyExpenseList: [],
  contentEditable: false,
};

const budgetAfterEdition = (list, newAmount) => {
  let remainingAmount = newAmount;
  for (let i = 0; i < list.length; i++) {
    remainingAmount = remainingAmount - list[i].cost;
  }
  return remainingAmount;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        remainingBudget: state.remainingBudget - action.payload.cost,
        spentBudget: state.spentBudget + action.payload.cost,
        expensesList: [...state.expensesList, { ...action.payload }],
        copyExpenseList: [...state.copyExpenseList, { ...action.payload }],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        remainingBudget: state.remainingBudget + action.payload.cost,
        spentBudget: state.spentBudget - action.payload.cost,
        expensesList: state.expensesList.filter((expense) => {
          return expense.id !== action.payload.id;
        }),
        copyExpenseList: state.copyExpenseList.filter((expense) => {
          return expense.id !== action.payload.id;
        }),
      };

    case SEARCH_EXPENSE:
      return {
        ...state,
        copyExpenseList: state.expensesList.filter((expense) => {
          return expense.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    case ON_EDIT_CLICK:
      return {
        ...state,
        contentEditable: !state.contentEditable,
      };
    case EDIT_BUDGET_AMOUNT:
      return {
        ...state,
        budget: action.payload,
        remainingBudget: budgetAfterEdition(state.expensesList, action.payload),
        spentBudget:
          action.payload -
          budgetAfterEdition(state.expensesList, action.payload),
        contentEditable: !state.contentEditable,
      };
    default:
      return state;
  }
};

export default reducer;
