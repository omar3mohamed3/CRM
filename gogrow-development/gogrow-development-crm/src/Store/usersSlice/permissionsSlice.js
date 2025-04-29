import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Thunk for fetching permissions
export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/permissions`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching user permissions
export const fetchUserPermissions = createAsyncThunk(
  "permissions/fetchUserPermissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}users/${userId}/permissions`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for posting updated permissions
export const postPermissions = createAsyncThunk(
  "permissions/postPermissions",
  async ({ permissions, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}users/${userId}/assign-permissions`,
        permissions,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    permissions: [],
    userPermissions: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch User Permissions
      .addCase(fetchUserPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        state.userPermissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Post Permissions
      .addCase(postPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(postPermissions.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postPermissions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default permissionsSlice.reducer;
