import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Url/url";
import toast from "react-hot-toast";
import { CodeSquare } from "lucide-react";

// Helper function to get the token from localStorage or sessionStorage
const getToken = () => {
  return sessionStorage.getItem("access_token");
  // localStorage.getItem("access_token");
  // ||
};
const getModuleId = () => {
  return localStorage.getItem("module_id()");
  // localStorage.getItem("access_token");
  // ||
};

// Async thunk for handling the login API request
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password, remember, ip_address, device },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${URL}login`, {
        email,
        password,
        ip_address, //TODO REMOVE  COMMENT
        device: device?.deviceName,
      });
      const token = response.data.data.access_token;

      // Module num
      localStorage.setItem("module_id", response.data.data.user.module_id);
      // Store token based on "Remember me" option
      // if (remember) {
      // localStorage.setItem("access_token", token);
      // } else {
      sessionStorage.setItem("access_token", token);
      // }

      return response.data; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk to fetch user role/info after login
export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(`${URL}me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user role"
      );
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      state.user = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        // Toast Notification for success
        toast.success(action.payload.message || "Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // Toast Notification for error
        toast.error(action.payload?.message || "Login failed");
      })

      // Handle fetchUserRole actions
      .addCase(fetchUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        //toast.error(action.payload?.message || "Failed to fetch user role");
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
