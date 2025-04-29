// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";
import { module_id, URL } from "../../Url/url";

// Helper function to get the token from localStorage or sessionStorage
export const getToken = () => {
  return sessionStorage.getItem("access_token");
  // localStorage.getItem("access_token");
  // ||
  // sessionStorage.getItem("access_token")
};

// Async thunk to fetch dashboard summary
export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/dashboard-summary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the dashboard data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dashboard summary"
      );
    }
  }
);

// Create the dashboard slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
        // toast.success("Dashboard summary fetched successfully");
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload?.message || "Failed to fetch dashboard summary"
        );
      });
  },
});

export default dashboardSlice.reducer;
