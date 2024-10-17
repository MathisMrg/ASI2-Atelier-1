import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import cardReducer from "./card.reducer";

const globalReducer = combineReducers({
  userReducer: userReducer,
  cardReducer: cardReducer,
});
export default globalReducer;