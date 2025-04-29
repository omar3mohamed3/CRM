import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch reported leads data with filtering parameters
export const fetchReportedLeads = createAsyncThunk(
  "reportedLeads/fetchReportedLeads",
  async (
    { page = 1, teamId, memberId, date_from, date_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/reports/customers`,
        {
          params: {
            page,
            filter_type:
              !memberId && !teamId ? null : memberId ? "member" : "team",
            team_id: !memberId && teamId ? teamId : null,
            user_id: memberId ? memberId : null,
            // date_from: date_from ? date_from : null,
            // date_to: date_to ? date_to : null,
          },
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reportedLeadsSlice = createSlice({
  name: "reportedLeads",
  initialState: {
    reportedLeadsData: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    filters: {
      teamId: null,
      memberId: null,
      // date_from: null,
      // date_to: null,
    },
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextReportedLeadsPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousReportedLeadsPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
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
      .addCase(fetchReportedLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportedLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedLeadsData = action.payload.data.data;

        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchReportedLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setNextReportedLeadsPage,
  setPreviousReportedLeadsPage,
  setCurrentPage,
  setFilters,
  resetFilters,
} = reportedLeadsSlice.actions;

// Export reducer
export default reportedLeadsSlice.reducer;
