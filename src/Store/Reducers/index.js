import { combineReducers } from "redux";
import investReducer from "./investReducer";
import entireDataReducer from "./entireDataReducer";

const allReducers = combineReducers({ investReducer, entireDataReducer });

export default allReducers;
