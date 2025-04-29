import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}modules/${module_id()}/profile`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating user details
export const updateUserDetails = createAsyncThunk(
  "userDetails/updateUserDetails",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/profile/data`,
        userDetails,
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

// Slice definition
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        toast.success("Profile Settings has been updated");
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.payload.errors;
        toast.error(action?.payload?.message);
      });
  },
});

export default userDetailsSlice.reducer;
