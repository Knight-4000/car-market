
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import autoReducer from "./slice/autoSlice";
import filterReducer from "./slice/filterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  auto: autoReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;