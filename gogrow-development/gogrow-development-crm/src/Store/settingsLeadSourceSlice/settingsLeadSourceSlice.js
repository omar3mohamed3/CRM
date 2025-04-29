import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk to fetch lead sources
export const fetchSettingsLeadSource = createAsyncThunk(
  "leadSource/fetchSettingsLeadSource",
  async ({ page = 1, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/lead-sources`,
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

// Async thunk to create a lead source
export const createLeadSource = createAsyncThunk(
  "leadSource/createLeadSource",
  async ({ sourceData }, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/lead-sources`,
        sourceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add lead source"
      );
    }
  }
);

// Async thunk to update a lead source
export const updateLeadSource = createAsyncThunk(
  "leadSource/updateLeadSource",
  async ({ sourceId, sourceData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/lead-sources/${sourceId}`,
        { ...sourceData, description: null },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { sourceId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a lead source
export const deleteLeadSource = createAsyncThunk(
  "leadSource/deleteLeadSource",
  async (sourceId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/lead-sources/${sourceId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { sourceId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete lead sources
export const deleteLeadSourcesBulk = createAsyncThunk(
  "leadSource/deleteLeadSourcesBulk",
  async ({ sourceIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/batch-delete/lead-sources`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: sourceIds },
        }
      );
      return { sourceIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const leadSourceSlice = createSlice({
  name: "leadSource",
  initialState: {
    settingsLeadsSource: [], // Data from API
    settingsLeadsSourceBulk: [], // Selected for Bulk actions
    loading: false,
    addLoading: false,
    deleteLoading: false,
    editedSource: null, // Source ID and data to edit
    error: null,
    isModalOpen: false, // Modal open state
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
    toggleSettingsSourceSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsLeadsSourceBulk.includes(id)) {
        state.settingsLeadsSourceBulk = state.settingsLeadsSourceBulk.filter(
          (sourceId) => sourceId !== id
        );
      } else {
        state.settingsLeadsSourceBulk.push(id);
      }
    },
    toggleAllSettingSourceSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsLeadsSourceBulk.length === allIds.length) {
        state.settingsLeadsSourceBulk = [];
      } else {
        state.settingsLeadsSourceBulk = allIds;
      }
    },
    editLeadSource: (state, action) => {
      state.editedSource = action.payload;
    },
    openLeadSourceModal: (state) => {
      state.isModalOpen = true;
    },
    closeLeadSourceModal: (state) => {
      state.isModalOpen = false;
      state.editedSource = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextSourcePage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousSourcePage: (state) => {
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
      // Fetch Lead Sources
      .addCase(fetchSettingsLeadSource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsLeadSource.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsLeadsSource = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchSettingsLeadSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Lead Source
      .addCase(createLeadSource.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(createLeadSource.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Lead source added successfully");
      })
      .addCase(createLeadSource.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      // Update Lead Source
      .addCase(updateLeadSource.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(updateLeadSource.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Lead source updated successfully");
      })
      .addCase(updateLeadSource.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || "Failed to update lead source";
      })
      // Delete Lead Source
      .addCase(deleteLeadSource.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLeadSource.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { sourceId } = action.payload;
        state.settingsLeadsSource = state.settingsLeadsSource.filter(
          (source) => source.id !== sourceId
        );
      })
      .addCase(deleteLeadSource.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete lead source";
      })
      // Bulk Delete Lead Sources
      .addCase(deleteLeadSourcesBulk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteLeadSourcesBulk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { sourceIds } = action.payload;
        state.settingsLeadsSource = state.settingsLeadsSource.filter(
          (source) => !sourceIds.includes(source.id)
        );
        state.settingsLeadsSourceBulk = [];
      })
      .addCase(deleteLeadSourcesBulk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to bulk delete lead sources";
      });
  },
});

export const {
  toggleSettingsSourceSelection,
  openLeadSourceModal,
  closeLeadSourceModal,
  editLeadSource,
  setCurrentPage,
  setFilter,
  resetFilters,
  setNextSourcePage,
  setPreviousSourcePage,
  toggleAllSettingSourceSelection,
} = leadSourceSlice.actions;

export default leadSourceSlice.reducer;
