import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import axios from "axios";
import toast from "react-hot-toast";

// Simulate fetching a service by ID
//export const fetchSettingsLeadStatus = createAsyncThunk(
// "leadStatus/fetchSettingsLeadStatus",
//  async () => {
//   const tableData = [
//    { count: "1", id: "8080874541", status: "Cold" },
//     { count: "2", id: "8080874542", status: "Cold" },
//     { count: "3", id: "8080874543", status: "Cold" },
//     { count: "4", id: "8080874544", status: "Cold" },
//    { count: "5", id: "8080874545", status: "Cold" },
//    { count: "6", id: "8080874546", status: "Cold" },
//     { count: "7", id: "8080874547", status: "Cold" },
//   ];
//   return tableData;
// }
//);

// Async thunk to fetch lead statuses
export const fetchSettingsLeadStatus = createAsyncThunk(
  "leadStatus/fetchSettingsLeadStatus",
  async ({ page = 1, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/lead-statuses`,
        {
          params: {
            page: page ? page : 1,
            search: search ? search : null,
          },
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a lead status
export const createLeadStatus = createAsyncThunk(
  "leadStatus/createLeadStatus",
  async ({ statusData }, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/lead-statuses`,
        { ...statusData, description: null },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add lead status"
      );
    }
  }
);

// Async thunk to update a lead status
export const updateLeadStatus = createAsyncThunk(
  "leadStatus/updateLeadStatus",
  async ({ statusId, statusData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/lead-statuses/${statusId}`,
        statusData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { statusId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a lead status
export const deleteLeadStatus = createAsyncThunk(
  "leadStatus/deleteLeadStatus",
  async (statusId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/lead-statuses/${statusId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { statusId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete lead statuses
export const deleteLeadStatusesBulk = createAsyncThunk(
  "leadStatus/deleteLeadStatusesBulk",
  async ({ statusIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/batch-delete/lead-statuses`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: statusIds },
        }
      );
      return { statusIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const leadStatusSlice = createSlice({
  name: "leadStatus",
  initialState: {
    settingsLeadsStatus: [], // Data from api
    settingsLeadsStatusBulk: [], // Selected to Bulk
    loading: false,
    addLoading: false,
    deleteLoading: false,
    editedstatus: null, // Service ID and data  To edit
    error: null,
    isModalOpen: false, // Open Edit Modal
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    filters: {
      search: null,
    },
  },
  reducers: {
    toggleSettingsStatusSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsLeadsStatusBulk.includes(id)) {
        state.settingsLeadsStatusBulk = state.settingsLeadsStatusBulk.filter(
          (leadId) => leadId !== id
        );
      } else {
        state.settingsLeadsStatusBulk.push(id);
      }
    },
    toggleAllSettingStatusSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsLeadsStatusBulk.length === allIds.length) {
        state.settingsLeadsStatusBulk = [];
      } else {
        state.settingsLeadsStatusBulk = allIds;
      }
    },
    editLeadStatus: (state, action) => {
      state.editedstatus = action.payload;
    },
    openLeadStatusModal: (state) => {
      state.isModalOpen = true;
    },
    closeLeadStatusModal: (state) => {
      state.isModalOpen = false;
      state.editedstatus = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextStatusPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousStatusPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsLeadsStatus = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchSettingsLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Lead Status
      .addCase(createLeadStatus.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(createLeadStatus.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Lead status added successfully");
      })
      .addCase(createLeadStatus.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      // Update Lead Status
      .addCase(updateLeadStatus.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Lead status updated successfully");
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || "Failed to update lead status";
      })
      // Delete Lead Status
      .addCase(deleteLeadStatus.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLeadStatus.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { statusId } = action.payload;
        state.settingsLeadsStatus = state.settingsLeadsStatus.filter(
          (status) => status.id !== statusId
        );
      })
      .addCase(deleteLeadStatus.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete lead status";
      })
      // Bulk Delete Lead Statuses
      .addCase(deleteLeadStatusesBulk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLeadStatusesBulk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { statusIds } = action.payload;
        state.settingsLeadsStatus = state.settingsLeadsStatus.filter(
          (status) => !statusIds.includes(status.id)
        );
        state.selectedStatuses = [];
      })
      .addCase(deleteLeadStatusesBulk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to bulk delete lead statuses";
      });
  },
});

export const {
  toggleSettingsStatusSelection,
  openLeadStatusModal,
  closeLeadStatusModal,
  editLeadStatus,
  setCurrentPage,
  setFilter,
  resetFilters,
  setNextStatusPage,
  setPreviousStatusPage,
  toggleAllSettingStatusSelection,
} = leadStatusSlice.actions;

export default leadStatusSlice.reducer;
