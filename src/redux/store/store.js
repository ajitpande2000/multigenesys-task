import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import countryReducer from "./slices/countriesSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer, 
    country:  countryReducer
  }  
});
