// assignedUsersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { module_id, URL } from "../../Url/url"; // Ensure the URL is imported
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch assigned users
export const fetchAssignedUsers = createAsyncThunk(
  "assignedUsers/fetchAssigned",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/users/assgined`, // Update the URL as per your local variable
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.map((user) => ({
        id: user.id,
        label: user.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch assigned users"
      );
    }
  }
);
// Async thunk to fetch assigned users
export const fetchAssignedUsersEditTeam = createAsyncThunk(
  "assignedUsers/fetchAssignedUsersEditTeam",
  async (teamId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/teams/${teamId}/users-and-unassigned`, // Update the URL as per your local variable
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.users.map((user) => ({
        id: user.id,
        label: user.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch assigned users"
      );
    }
  }
);
// Async thunk to fetch assigned users
export const fetchNotAssignedUsersTeam = createAsyncThunk(
  "assignedUsers/fetchNotAssignedUsersTeam",
  async (teamId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/users-not-in-team`, // Update the URL as per your local variable
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.map((user) => ({
        id: user.id,
        label: user.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch assigned users"
      );
    }
  }
);

// Create the assignedUsers slice
const assignedUsersSlice = createSlice({
  name: "assignedUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,

    usersTeam: [],
    usersTeamError: false,
    usersTeamLoading: null,

    usersNotInTeam: [],
    usersNotInTeamError: false,
    usersNotInTeamLoading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Store the transformed users
      })
      .addCase(fetchAssignedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Users in team and not assigned
      .addCase(fetchAssignedUsersEditTeam.pending, (state) => {
        state.usersTeamLoading = true;
        state.usersTeamError = null;
      })
      .addCase(fetchAssignedUsersEditTeam.fulfilled, (state, action) => {
        state.usersTeamLoading = false;
        state.users = action.payload; // Store the transformed users
      })
      .addCase(fetchAssignedUsersEditTeam.rejected, (state, action) => {
        state.usersTeamLoading = false;
        state.usersTeamError = action.payload;
      })

      // Users Not in team and not assigned
      .addCase(fetchNotAssignedUsersTeam.pending, (state) => {
        state.usersNotInTeamLoading = true;
        state.usersNotInTeamError = null;
      })
      .addCase(fetchNotAssignedUsersTeam.fulfilled, (state, action) => {
        state.usersNotInTeamLoading = false;
        state.usersNotInTeam = action.payload; // Store the transformed users
      })
      .addCase(fetchNotAssignedUsersTeam.rejected, (state, action) => {
        state.usersNotInTeamLoading = false;
        state.usersNotInTeamError = action.payload;
      });
  },
});

export default assignedUsersSlice.reducer;
