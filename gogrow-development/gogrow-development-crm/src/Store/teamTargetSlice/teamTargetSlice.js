import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import { act } from "react";
import toast from "react-hot-toast";

// Async thunk to fetch team targets
export const fetchTeamTarget = createAsyncThunk(
  "teamTarget/fetchTeamTarget",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/teams/${teamId}/targets-achievements`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Adjust according to your API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch team targets"
      );
    }
  }
);

// Async thunk to create a new team target
export const createTeamTarget = createAsyncThunk(
  "teamTarget/createTeamTarget",
  async ({ teamId, targetData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/teams/${teamId}/add-target`,
        targetData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Adjust according to your API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create team target"
      );
    }
  }
);

// Async thunk to edit an existing team target
export const editTeamTarget = createAsyncThunk(
  "teamTarget/editTeamTarget",
  async ({ teamId, targetId, target }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/teams/${teamId}/update-target/${targetId}`,
        { target },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Adjust according to your API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to edit team target"
      );
    }
  }
);

// Create the team target slice
const teamTargetSlice = createSlice({
  name: "teamTarget",
  initialState: {
    teamTarget: [], // Data from API
    loading: false,
    editedTeamTarget: null, // Team target data to edit
    error: null,
    isModalOpen: false, // Open Edit Modal
  },
  reducers: {
    openTeamTargetModal: (state) => {
      state.isModalOpen = true;
    },
    closeTeamTargetModal: (state) => {
      state.isModalOpen = false;
      state.editedTeamTarget = null;
    },
    setEditTargetMonth: (state, action) => {
      state.editedTeamTarget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch team targets
      .addCase(fetchTeamTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.teamTarget = action.payload;
      })
      .addCase(fetchTeamTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use payload for error message
      })
      // Create team target
      .addCase(createTeamTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamTarget.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        //Close Modal
        state.isModalOpen = false;
        state.editedTeamTarget = null;
      })
      .addCase(createTeamTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use payload for error message
      })
      // Edit team target
      .addCase(editTeamTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTeamTarget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamTarget.findIndex(
          (target) => target.id === action.payload.id
        );
        if (index >= 0) {
          state.teamTarget[index].target = action.payload.target; // Update existing target
        }
        toast.success("Target updated successfully");

        //Close Modal
        state.isModalOpen = false;
        state.editedTeamTarget = null;
      })
      .addCase(editTeamTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use payload for error message
        toast.error(action.payload?.message);
      });
  },
});

export const { openTeamTargetModal, closeTeamTargetModal, setEditTargetMonth } =
  teamTargetSlice.actions;

export default teamTargetSlice.reducer;
