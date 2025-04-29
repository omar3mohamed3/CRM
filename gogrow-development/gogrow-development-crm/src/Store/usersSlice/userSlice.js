import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Thunks for API calls
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/users/details/${userId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}update-user-profile/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${URL}modules/${module_id()}/users/details/${userId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}users/register`, userData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    createloading: false,
    createerror: null,
    error: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Info
      .addCase(updateUserInfo.pending, (state) => {
        state.createloading = true;
        state.createerror = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.createloading = false;
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.createloading = false;
        state.createerror = action.payload;
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.createloading = true;
        state.createerror = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createloading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createloading = false;
        state.createerror = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null; // or handle removal of user data
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
