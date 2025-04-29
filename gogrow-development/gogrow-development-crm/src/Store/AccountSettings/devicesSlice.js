import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk for fetching devices
export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/all/active-users`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.active_users; // Assuming the devices data is in `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for signing out from a specific device
export const signOutFromDevice = createAsyncThunk(
  "devices/signOutFromDevice",
  async (tokenId, { rejectWithValue }) => {
    try {
      await axios.post(
        `${URL}sign-out-user/${tokenId}`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return tokenId; // Return the deviceId to update the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for signing out from all devices
export const signOutFromAllDevices = createAsyncThunk(
  "devices/signOutFromAllDevices",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${URL}modules/${module_id()}/sign-out-all`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devicesList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devicesList = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOutFromDevice.fulfilled, (state, action) => {
        state.devicesList = state.devicesList.filter(
          (device) => device.token_id !== action.payload
        );
        toast.success("You has been loged out from Device");
      })
      .addCase(signOutFromAllDevices.fulfilled, (state) => {
        state.devicesList = [];
      });
  },
});

export default devicesSlice.reducer;
