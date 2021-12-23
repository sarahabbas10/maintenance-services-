import {combineReducers,createStore} from "redux"
import customerReducer from "./customer"


const reducers=combineReducers ({customerReducer})
const store =createStore(reducers)

export default store;
