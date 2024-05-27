import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import employeeSlice from "./modules/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeSlice,
  },
});
