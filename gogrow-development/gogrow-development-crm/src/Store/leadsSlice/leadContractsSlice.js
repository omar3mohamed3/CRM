// src/Store/leadsSlice/leadContractsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { getToken } from "../DashBoard/dashboardSlice";
import { module_id, URL } from "../../Url/url";

// Async thunk to fetch lead contracts
export const fetchLeadContracts = createAsyncThunk(
  "leadContracts/fetchContracts",
  async (leadId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/${leadId}/contracts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data is the contracts array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead contracts"
      );
    }
  }
);

// Async thunk to upload a lead contract
export const uploadLeadContract = createAsyncThunk(
  "leadContracts/uploadContract",
  async ({ leadId, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("document", file); // 'contractFile' is the field name in the API

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/${leadId}/contracts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success("Contract uploaded successfully!");
      return response.data.contract; // Return the response data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to upload contract"
      );
    }
  }
);

// Async thunk to delete a lead contract
export const deleteLeadContract = createAsyncThunk(
  "leadContracts/deleteContract",
  async ({ leadId, contractId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      await axios.delete(
        `${URL}modules/${module_id()}/leads/${leadId}/contracts/${contractId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Contract deleted successfully");
      return contractId; // Return the ID of the deleted contract
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete contract"
      );
    }
  }
);

// Lead contracts slice
const leadContractsSlice = createSlice({
  name: "leadContracts",
  initialState: {
    contracts: [],
    loading: false,
    uploadLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch contracts
    builder
      .addCase(fetchLeadContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload;
      })
      .addCase(fetchLeadContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to fetch contracts");
      })

      // Upload contract
      .addCase(uploadLeadContract.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadLeadContract.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.contracts.push(action.payload); // Add new contract to list
      })
      .addCase(uploadLeadContract.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to upload contract");
      })

      // Delete contract
      .addCase(deleteLeadContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = state.contracts.filter(
          (contract) => contract.id !== action.payload
        );
      })
      .addCase(deleteLeadContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload?.message || "Failed to delete contract");
      });
  },
});

export default leadContractsSlice.reducer;
