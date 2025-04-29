// leadSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import toast from "react-hot-toast";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to add a lead
export const addLead = createAsyncThunk(
  "addLead/addLead",
  async ({ productType, leadData }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/product-type/${productType}/leads`, // API endpoint
        leadData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the added lead data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add lead");
    }
  }
);

// Create the lead slice
const addLeadSlice = createSlice({
  name: "addLead",
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
        // toast.success("Lead added successfully");
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addLeadSlice.reducer;
