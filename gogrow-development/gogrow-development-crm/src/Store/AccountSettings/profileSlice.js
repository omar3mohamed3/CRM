import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk for fetching profile picture
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/profile/photo`,
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

// Async thunk for updating profile picture
export const updateProfilePicture = createAsyncThunk(
  "profile/updateProfilePicture",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.profile = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default profileSlice.reducer;
