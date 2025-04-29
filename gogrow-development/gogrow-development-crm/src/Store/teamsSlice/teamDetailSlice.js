import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch team details by team ID
export const fetchTeamDetail = createAsyncThunk(
  "teamDetail/fetchTeamDetail",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/teams/${teamId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the team data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch team details"
      );
    }
  }
);

// Async thunk to fetch team chart data
export const fetchTeamChartData = createAsyncThunk(
  "teamDetail/fetchTeamChartData",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/teams/${teamId}/data`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the team chart data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch team chart data"
      );
    }
  }
);

// Async thunk to edit team details
export const editTeamDetail = createAsyncThunk(
  "teamDetail/editTeamDetail",
  async ({ teamId, teamData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/teams/${teamId}`,
        teamData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the updated team data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update team details"
      );
    }
  }
);

// Create the team detail slice
const teamDetailSlice = createSlice({
  name: "teamDetail",
  initialState: {
    team: null, // Team detail data
    chartData: null, // Chart data for the team
    loadingTeam: false,
    loadingChart: false, // Loading state for API calls
    loadingEdit: false, // Loading state for API calls
    error: null, // API error message
  },
  reducers: {
    clearTeamDetail: (state, action) => {
      state.team = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch team details
      .addCase(fetchTeamDetail.pending, (state) => {
        state.loadingTeam = true;
        state.error = null;
      })
      .addCase(fetchTeamDetail.fulfilled, (state, action) => {
        state.loadingTeam = false;
        state.team = action.payload;
      })
      .addCase(fetchTeamDetail.rejected, (state, action) => {
        state.loadingTeam = false;
        state.error = action.payload;
      })

      // Fetch team chart data
      .addCase(fetchTeamChartData.pending, (state) => {
        state.loadingChart = true;
        state.error = null;
      })
      .addCase(fetchTeamChartData.fulfilled, (state, action) => {
        state.loadingChart = false;
        state.chartData = action.payload; // Store chart data in state
      })
      .addCase(fetchTeamChartData.rejected, (state, action) => {
        state.loadingChart = false;
        state.error = action.payload;
      })

      // Edit team details
      .addCase(editTeamDetail.pending, (state) => {
        state.loadingEdit = true;
        state.error = null;
      })
      .addCase(editTeamDetail.fulfilled, (state, action) => {
        state.loadingEdit = false;

        // state.team = action.payload;
      })
      .addCase(editTeamDetail.rejected, (state, action) => {
        state.loadingEdit = false;
        state.error = action.payload;
      });
  },
});

export const { clearTeamDetail } = teamDetailSlice.actions;

export default teamDetailSlice.reducer;
