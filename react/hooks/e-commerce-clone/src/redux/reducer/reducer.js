import notificationReducer from "../../components/FormComponents/Notification/redux/reducer/reducer";
import userReducer from "../../components/redux/reducer/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  notificationReducer,
  userReducer,
});

export default rootReducer;
