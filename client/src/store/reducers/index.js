import { combineReducers } from "redux";
import site from "./site_reducer";

const appReducers = combineReducers({ site });

export default appReducers;
