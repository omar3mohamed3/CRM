// leadStatisticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import toast from "react-hot-toast";
import { getToken } from "./dashboardSlice";

// Async thunk to fetch lead statistics
export const fetchLeadStatistics = createAsyncThunk(
  "leadStatistics/fetchData",
  async ({ year = new Date().getFullYear() }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/dashboard-leadStatistics?year=${year}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the lead statistics data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead statistics"
      );
    }
  }
);

// Create the leadStatistics slice
const leadStatisticsSlice = createSlice({
  name: "leadStatistics",
  initialState: {
    statistics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
        // toast.success("Lead statistics fetched successfully");
      })
      .addCase(fetchLeadStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload?.message || "Failed to fetch lead statistics"
        );
      });
  },
});

export default leadStatisticsSlice.reducer;
