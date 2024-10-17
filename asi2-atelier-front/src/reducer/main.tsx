import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const globalReducer = combineReducers({
  userReducer: userReducer,
});
export default globalReducer;