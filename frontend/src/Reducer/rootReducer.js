import { combineReducers } from 'redux';
import { userReducer } from  './userReducer'
import {postReducer} from "./postReducer";
import {complainReducer} from "./complainReducer";

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    complain: complainReducer
});

export default rootReducer;