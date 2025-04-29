import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Adjust the URL accordingly
import toast from "react-hot-toast";
import { getToken } from "../DashBoard/dashboardSlice";
import { module_id, URL } from "../../Url/url";
// Assuming you manage the token here

// Async thunk to fetch proposals
export const fetchLeadProposals = createAsyncThunk(
  "leadProposals/fetchProposals",
  async (leadId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/${leadId}/proposals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data is the proposals array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead proposals"
      );
    }
  }
);

// POST API to upload a proposal
export const uploadLeadProposal = createAsyncThunk(
  "leadProposals/uploadProposal",
  async ({ leadId, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("document", file); // 'document' is the field name in the API

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/${leadId}/proposals`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.proposal; // Return the response data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload proposal"
      );
    }
  }
);

// Async thunk to delete a proposal
export const deleteLeadProposal = createAsyncThunk(
  "leadProposals/deleteProposal",
  async ({ leadId, proposalId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      await axios.delete(
        `${URL}modules/${module_id()}/leads/${leadId}/proposals/${proposalId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return proposalId; // Return the ID of the deleted proposal
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete proposal"
      );
    }
  }
);

// Lead proposals slice
const leadProposalsSlice = createSlice({
  name: "leadProposals",
  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch proposals
    builder
      .addCase(fetchLeadProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchLeadProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to fetch proposals");
      })

      // Upload proposal

      .addCase(uploadLeadProposal.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadLeadProposal.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.proposals.push(action.payload); // Add new proposal to list
        toast.success("Proposal uploaded successfully!");
      })
      .addCase(uploadLeadProposal.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
        toast.error("Failed to upload proposal");
      })

      // Delete proposal

      .addCase(deleteLeadProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = state.proposals.filter(
          (proposal) => proposal.id !== action.payload
        );
        toast.success("Proposal deleted successfully");
      })
      .addCase(deleteLeadProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to delete proposal");
      });
  },
});

export default leadProposalsSlice.reducer;
