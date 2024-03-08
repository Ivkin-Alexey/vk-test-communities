import {combineReducers} from "redux";
import { groupsStore } from './Groups';

const rootReducer = combineReducers({
    groups: groupsStore.reducer,
})

export default rootReducer;