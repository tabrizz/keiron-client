import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from './user/reducer'
import ticketReducer from './ticket/reducer'

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  user: userReducer,
  ticket: ticketReducer
})

export default persistReducer(persistConfig, rootReducer)