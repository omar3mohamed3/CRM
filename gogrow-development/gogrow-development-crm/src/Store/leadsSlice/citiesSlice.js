// countriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../DashBoard/dashboardSlice";
import { URL } from "../../Url/url";

// Async thunk to fetch countries
export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async ({ countryId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}cities?propertiescountry_id=${countryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.map((city) => ({
        id: city.id,
        label: city.name,
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
const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload; // Store the transformed countries
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default citiesSlice.reducer;
