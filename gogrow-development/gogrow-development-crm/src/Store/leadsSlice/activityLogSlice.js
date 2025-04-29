import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Define the base URL for activity logs
const baseUrl = `${URL}modules/1/leads/1489/activity-logs`;

// Fetch activity logs
export const fetchActivityLogs = createAsyncThunk(
  "activityLog/fetchActivityLogs",
  async ({ leadId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/1/leads/${leadId}/activity-logs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data contains the activity logs array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch activity logs"
      );
    }
  }
);

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      });
  },
});

export default activityLogSlice.reducer;
