import { combineReducers } from "redux";
import bitcoinReducer from "./rangosReducer";

const rootReducer = combineReducers({
  bitcoin: bitcoinReducer
})

export default rootReducer;