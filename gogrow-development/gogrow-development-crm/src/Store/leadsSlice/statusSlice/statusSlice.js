// leadStatusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../DashBoard/dashboardSlice";
import { module_id, URL } from "../../../Url/url";

// Async thunk to fetch lead statuses
export const fetchLeadStatuses = createAsyncThunk(
  "leadsStatus/fetchStatuses",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/lead-statuses/get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Transform the response into { value: id, label: status_name } format
      const transformedData = response.data.data.map((status) => ({
        id: status.id,
        label: status.status_name,
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
const leadsStatusSlice = createSlice({
  name: "leadsStatus",
  initialState: {
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadStatuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload; // Store the transformed statuses
      })
      .addCase(fetchLeadStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadsStatusSlice.reducer;
