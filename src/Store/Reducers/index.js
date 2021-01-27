import { combineReducers } from "redux";
import investReducer from './investReducer'

const allReducers = combineReducers({ investReducer });

export default allReducers;
