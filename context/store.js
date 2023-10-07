import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/loginSlice";
import documentReducer from "./features/documentSlice";

const store = configureStore({
  reducer: { user: userReducer, documents: documentReducer },
});

export default store;
