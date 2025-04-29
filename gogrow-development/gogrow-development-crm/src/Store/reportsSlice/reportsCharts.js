import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch reported leads data with filtering parameters
export const fetchReportedCharts = createAsyncThunk(
  "reportedCharts/fetchReportedCharts",
  async ({ teamId, memberId, date_from, date_to }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}modules/${module_id()}/reports`, {
        params: {
          filter_type:
            !memberId && !teamId ? null : memberId ? "member" : "team",
          team_id: !memberId && teamId ? teamId : null,
          user_id: memberId ? memberId : null,
          // date_from: date_from ? date_from : null,
          // date_to: date_to ? date_to : null,
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reportedChartsSlice = createSlice({
  name: "reportedCharts",
  initialState: {
    reportedChartsData: [],
    loading: false,
    error: null,
    filters: {
      teamId: null,
      memberId: null,
      // date_from: null,
      // date_to: null,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        teamId: null,
        memberId: null,
        // date_from: null,
        // date_to: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportedCharts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportedCharts.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedChartsData = action.payload;
      })
      .addCase(fetchReportedCharts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilters, resetFilters } = reportedChartsSlice.actions;

// Export reducer
export default reportedChartsSlice.reducer;
