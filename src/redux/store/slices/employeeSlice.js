import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import { toast } from "react-toastify";

const initialState = {
  employeeList:[],
  selectedEmployee:null,
  loading:false,
  error:''
};

export const getEmployeeList = createAsyncThunk(
  "employee/List",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee')       
      return {
        data: response.data,        
      };
    } catch (error) {     
      return rejectWithValue("Error fetching employee list");
    }
  }
);



export const deleteEmployee = createAsyncThunk(
  "employee/delete",
 async (employee, { rejectWithValue }) => {
    try {    
      const response = await api.get(`/employee/${employee?.id}`);  
      toast.success("Employee record deleted successfully."); 
      return {
        data: response.data,        
      };
    } catch (error) {   
      toast.error("Failed to delete employee record.");   
      return rejectWithValue("Error delete employee.");
    }
  }
);

export const addEmployee= createAsyncThunk(
  "employee/add",
  async (newEmployee, { rejectWithValue }) => {
    try {   
      const response = await api.post(`/employee`,newEmployee);
      toast.success("Employee record added successfully."); 
      return response.data;
    } catch (error) { 
        toast.error("Failed to add employee record."); 
      return rejectWithValue(error || "Error adding employee");
    }
  }
);

export const updateEmployee= createAsyncThunk(
  "employee/update",
  async (employee, { rejectWithValue }) => {
    try {       
      const response = await api.put(`/employee/${employee?.id}`,employee);   
      toast.success("Employee record updated successfully."); 
      return response.data;
    } catch (error) { 
       toast.error("Failed to update employee record."); 
      return rejectWithValue(error || "Error for update employee");
    }
  }
);


const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = action.payload.data;         
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })       
    
      .addCase(addEmployee.fulfilled, (state, action) => {       
         state.employeeList.unshift(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {     
        state.error = action.payload;
      })
       .addCase(deleteEmployee.fulfilled, (state, action) => {      
        state.employeeList = state.employeeList.filter((emp) => emp.id !== action.payload?.data?.id);     
      })
       .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employeeList.findIndex((v) => v.id === action.payload?.id);
        console.log("updateEmployee.fulfilled=>",index, state.employeeList[index],action.payload)
        if (index !== -1) {
          state.employeeList[index] = action.payload;
        }
      });
  },
});

export default employeeSlice.reducer;
