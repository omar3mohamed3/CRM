import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url"; // Ensure correct URL base
import toast from "react-hot-toast";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch lead information
export const fetchLeadInfo = createAsyncThunk(
  "leadInfo/fetchData",
  async (leadId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/${leadId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data; // Return the lead data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead info"
      );
    }
  }
);

// Async thunk to convert lead to customer
export const convertLeadToCustomer = createAsyncThunk(
  "leadInfo/convertLead",
  async (leadId, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/${leadId}/convert`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming the response contains conversion success data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to convert lead");
    }
  }
);

// Async thunk to toggle lead status between inprogress and failed
export const toggleLeadStatus = createAsyncThunk(
  "leadInfo/toggleStatus",
  async (leadId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/leads/${leadId}/toggle-success`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data; // Assuming the API returns the updated status
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to toggle lead status"
      );
    }
  }
);

// Create the leadInfo slice
const leadInfoSlice = createSlice({
  name: "leadInfo",
  initialState: {
    lead: null,
    loading: false,
    error: null,
    convertLeadLoading: false,
    progressFailedLoading: false,
    conversionSuccess: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(fetchLeadInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to fetch lead info");
      })
      // Handle lead conversion states
      .addCase(convertLeadToCustomer.pending, (state) => {
        state.convertLeadLoading = true;
        state.error = null;
      })
      .addCase(convertLeadToCustomer.fulfilled, (state, action) => {
        state.convertLeadLoading = false;
        state.conversionSuccess = action.payload;
        toast.success("Lead successfully converted to customer!");
      })
      .addCase(convertLeadToCustomer.rejected, (state, action) => {
        state.convertLeadLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to convert lead");
      })
      .addCase(toggleLeadStatus.pending, (state) => {
        state.progressFailedLoading = true; // Optionally track progressFailedLoading state for the toggle
      })
      .addCase(toggleLeadStatus.fulfilled, (state, action) => {
        state.progressFailedLoading = false;
        toast.success("Lead status edited successfully!");

        // Update the lead status in the state based on the API response
        state.lead.success = action.payload.type; // Assuming the API response contains the new status
      })
      .addCase(toggleLeadStatus.rejected, (state, action) => {
        state.progressFailedLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to toggle lead status");
      });
  },
});

// Export the reducer
export default leadInfoSlice.reducer;
