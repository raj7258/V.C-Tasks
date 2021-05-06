import { ADD_TASK, DELETE_TASK, EDIT_TASK } from "./actions";

const initState = {
  tasks: [],
};

const editTask = (allTasks, task, newStatus) => {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === task.id && newStatus) {
      allTasks[i]["status"] = newStatus;
    }
  }
  return allTasks;
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
            ...action.payload,
          },
        ],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          return task.id !== action.payload.id;
        }),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [...editTask(state.tasks, action.payload, action.newStatus)],
      };
    default:
      return state;
  }
};

export default reducer;
