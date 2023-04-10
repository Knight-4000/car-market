
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import autoReducer from "./slice/autoSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  auto: autoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;