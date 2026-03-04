import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

const initialState = {
  countriesList:[],
  loading:false,
  error:''
};

export const getCountries = createAsyncThunk(
  "countries/List",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await api.get('/country')       
      return {
        data: response.data,        
      };
    } catch (error) {     
      return rejectWithValue("Error fetching countries.");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countriesList = action.payload.data;         
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
      
  },
});

export default countriesSlice.reducer;
