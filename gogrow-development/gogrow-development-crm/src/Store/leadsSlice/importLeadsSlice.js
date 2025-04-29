// Import necessary dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Create async thunk for importing leads
export const importLeads = createAsyncThunk(
  "importleads/importLeads",
  async (formData, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/import`, // API endpoint
        formData, // Send FormData containing file and other fields
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );
      return response.data; // Assuming response contains import success info
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to import leads");
    }
  }
);

const importleadsSlice = createSlice({
  name: "importleads",
  initialState: {
    importLoading: false,
    importError: null,
    skipped_leads: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(importLeads.pending, (state) => {
        state.importLoading = true;
        state.importError = null;
      })
      .addCase(importLeads.fulfilled, (state, action) => {
        state.importLoading = false;
        toast.success(action.payload.message);
        state.skipped_leads = action.payload.skipped_leads;
        state.importError = null;
      })
      .addCase(importLeads.rejected, (state, action) => {
        state.importLoading = false;
        state.importError = action.payload;
      });
  },
});

export default importleadsSlice.reducer;
