import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk to fetch teams data with search and pagination
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}modules/${module_id()}/teams`, {
        params: {
          page,
          search: search ? search : null,
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch Teams
export const fetchAllTeams = createAsyncThunk(
  "teams/fetchAllTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/teams/list-all`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const transformedData = response.data.data.map((team) => ({
        id: team.id,
        label: team.team_name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a team
export const addTeam = createAsyncThunk(
  "teams/addTeam",
  async (teamData, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/teams`, // API endpoint for adding a team
        teamData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the added team data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add team");
    }
  }
);

// Async thunk to delete a single team
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/teams/${teamId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { teamId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update a single team
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, teamData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/teams/${teamId}`,
        { ...teamData },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { teamId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk update teams
export const updateTeamsBulk = createAsyncThunk(
  "teams/updateTeamsBulk",
  async ({ teamIds, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/teams/bulk-update`,
        {
          teamIds, // Array of team IDs to update
          ...updateData, // New data for the teams
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { teamIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete teams
export const deleteTeamsBulk = createAsyncThunk(
  "teams/deleteTeamsBulk",
  async (teamIds, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/dm/teams`, // API endpoint for bulk delete
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: teamIds }, // Payload containing an array of team IDs
        }
      );
      return { teamIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    allTeams: [],
    selectedTeams: [],
    loading: false,
    loadingAdd: false,
    allTeamsloading: false,
    errorAdd: null,
    error: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    search: "",
  },
  reducers: {
    toggleTeamsSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedTeams.includes(id)) {
        state.selectedTeams = state.selectedTeams.filter(
          (teamId) => teamId !== id
        );
      } else {
        state.selectedTeams.push(id);
      }
    },
    toggleAllTeamsSelection: (state, action) => {
      const allIds = action.payload;
      if (state.selectedTeams.length === allIds.length) {
        state.selectedTeams = [];
      } else {
        state.selectedTeams = allIds;
      }
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextTeamPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousTeamPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get List  of Services
      .addCase(fetchAllTeams.pending, (state) => {
        state.allTeamsloading = true;
        state.error = null;
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.allTeamsloading = false;
        state.allTeams = action.payload;
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.allTeamsloading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(
          (team) => team.id !== action.payload.teamId
        );
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        const updatedTeam = action.payload.data;
        state.teams = state.teams.map((team) =>
          team.id === updatedTeam.id ? updatedTeam : team
        );
      })
      .addCase(deleteTeamsBulk.fulfilled, (state, action) => {
        const { teamIds } = action.payload;
        state.teams = state.teams.filter((team) => !teamIds.includes(team.id));
        state.selectedTeams = []; // Clear selected teams after bulk deletion
      })
      .addCase(updateTeamsBulk.fulfilled, (state, action) => {
        const { teamIds, data } = action.payload;
        state.teams = state.teams.map((team) => {
          if (teamIds.includes(team.id)) {
            return { ...team, ...data }; // Merge the new data into the existing team
          }
          return team;
        });
      })
      .addCase(addTeam.pending, (state) => {
        state.loading = true;
        state.errorAdd = null;
      })
      .addCase(addTeam.fulfilled, (state) => {
        state.loading = false;
        state.errorAdd = null;
        // state.team = action.payload;
        toast.success("Team added successfully");
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.loading = false;

        state.errorAdd = action.payload;
      });
  },
});

export const {
  toggleTeamsSelection,
  toggleAllTeamsSelection,
  setNextTeamPage,
  setPreviousTeamPage,
  setCurrentPage,
  setSearch,
} = teamsSlice.actions;

export default teamsSlice.reducer;
