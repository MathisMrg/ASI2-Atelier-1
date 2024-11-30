import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import cardReducer from "./card.reducer";
import opponentReducer from "./opponent.reducer";

const globalReducer = combineReducers({
  userReducer: userReducer,
  cardReducer: cardReducer,
  opponentReducer: opponentReducer,
});
export default globalReducer;