// leadsSourceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch lead statuses
export const fetchLeadsSources = createAsyncThunk(
  "leadsSource/fetchSources",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/lead-sources/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: status_name } format
      const transformedData = response.data.data.map((status) => ({
        id: status.id,
        label: status.source_name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead statuses"
      );
    }
  }
);

// Create the leadStatus slice
const leadsSourceSlice = createSlice({
  name: "leadsSource",
  initialState: {
    sources: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadsSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadsSources.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload; // Store the transformed statuses
      })
      .addCase(fetchLeadsSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadsSourceSlice.reducer;
