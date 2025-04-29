// countriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../DashBoard/dashboardSlice";
import { URL } from "../../Url/url";

// Async thunk to fetch countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(`${URL}countries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.map((country) => ({
        id: country.id,
        label: country.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch countries"
      );
    }
  }
);

// Create the countries slice
const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload; // Store the transformed countries
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countriesSlice.reducer;
