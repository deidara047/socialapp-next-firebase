import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import usersReducer from "./reducers/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;