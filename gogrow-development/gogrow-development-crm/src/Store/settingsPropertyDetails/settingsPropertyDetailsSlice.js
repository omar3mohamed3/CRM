import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Simulate fetching a service by ID
export const fetchSettingsPropertyDetails = createAsyncThunk(
  "propertyDetails/fetchSettingsPropertyDetails",
  async () => {
    const tableData = [
      { count: "1", id: "8080874541", status: "Detail #1" },
      { count: "2", id: "8080874542", status: "Detail #2" },
      { count: "3", id: "8080874543", status: "Detail #3" },
      { count: "4", id: "8080874544", status: "Detail #4" },
      { count: "5", id: "8080874545", status: "Detail #5" },
      { count: "6", id: "8080874546", status: "Detail #6" },
      { count: "7", id: "8080874547", status: "Detail #7" },
    ];
    return tableData;
  }
);

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState: {
    settingsPropertyDetails: [], // Data from api
    settingsPropertyDetailsBulk: [], // Selected to Bulk
    loading: false,
    editedDetails: null, // Service ID and data  To edit
    error: null,
    isModalOpen: false, // Open Edit Modal
  },
  reducers: {
    toggleSettingsStatusSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsPropertyDetailsBulk.includes(id)) {
        state.settingsPropertyDetailsBulk =
          state.settingsPropertyDetailsBulk.filter((leadId) => leadId !== id);
      } else {
        state.settingsPropertyDetailsBulk.push(id);
      }
    },
    toggleAllSettingStatusSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsPropertyDetailsBulk.length === allIds.length) {
        state.settingsPropertyDetailsBulk = [];
      } else {
        state.settingsPropertyDetailsBulk = allIds;
      }
    },
    editPropertyDetails: (state, action) => {
      state.editedDetails = action.payload;
    },
    openPropertyDetailsModal: (state) => {
      state.isModalOpen = true;
    },
    closePropertyDetailsModal: (state) => {
      state.isModalOpen = false;
      state.editedDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsPropertyDetails = action.payload;
      })
      .addCase(fetchSettingsPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  toggleSettingsDetailsSelection,
  openPropertyDetailsModal,
  closePropertyDetailsModal,
  editPropertyDetails,
  toggleAllSettingDetailsSelection,
} = propertyDetailsSlice.actions;

export default propertyDetailsSlice.reducer;
