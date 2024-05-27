import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: { docs: [] },
  isEmployeesLoaded: false,
};

export const EmployeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees.docs = action.payload;
      state.isEmployeesLoaded = true;
    },
    addEmployee: (state, action) => {
      state.employees.docs = [...state.employees.docs, action.payload];
    },
    updateEmployee: (state, action) => {
      for (const i in state.employees.docs) {
        if (state.employees.docs[i]._id === action.payload._id) {
          state.employees.docs[i] = action.payload;
        }
      }
    },
    removeEmployee: (state, action) => {
      state.employees.docs = state.employees.docs.filter(
        (employee) => employee._id !== action.payload
      );
    },
  },
});

export const { setEmployees, addEmployee, removeEmployee, updateEmployee } =
  EmployeeSlice.actions;

export const selectemployees = (state) => state.employee.employees.docs;
export const isemployeesLoaded = (state) => state.employee.isemployeesLoaded;

export default EmployeeSlice.reducer;
