import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Simulate fetching a service by ID
export const fetchSettingsPropertyDirection = createAsyncThunk(
  "propertyDirection/fetchSettingsPropertyDirection",
  async () => {
    const tableData = [
      { count: "1", id: "8080874541", status: "Direct Lead" },
      { count: "2", id: "8080874542", status: "Direct Lead" },
      { count: "3", id: "8080874543", status: "Direct Lead" },
      { count: "4", id: "8080874544", status: "Direct Lead" },
      { count: "5", id: "8080874545", status: "Direct Lead" },
      { count: "6", id: "8080874546", status: "Direct Lead" },
      { count: "7", id: "8080874547", status: "Direct Lead" },
    ];
    return tableData;
  }
);

const propertyDirectionSlice = createSlice({
  name: "propertyDirection",
  initialState: {
    settingsPropertyDirection: [], // Data from api
    settingsPropertyDirectionBulk: [], // Selected to Bulk
    loading: false,
    editedDirection: null, // Service ID and data  To edit
    error: null,
    isModalOpen: false, // Open Edit Modal
  },
  reducers: {
    toggleSettingsDirectionSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsPropertyDirectionBulk.includes(id)) {
        state.settingsPropertyDirectionBulk =
          state.settingsPropertyDirectionBulk.filter((leadId) => leadId !== id);
      } else {
        state.settingsPropertyDirectionBulk.push(id);
      }
    },
    toggleAllSettingDirectionSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsPropertyDirectionBulk.length === allIds.length) {
        state.settingsPropertyDirectionBulk = [];
      } else {
        state.settingsPropertyDirectionBulk = allIds;
      }
    },
    editPropertyDirection: (state, action) => {
      state.editedDirection = action.payload;
    },
    openPropertyDirectionModal: (state) => {
      state.isModalOpen = true;
    },
    closePropertyDirectionModal: (state) => {
      state.isModalOpen = false;
      state.editedDirection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsPropertyDirection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsPropertyDirection.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsPropertyDirection = action.payload;
      })
      .addCase(fetchSettingsPropertyDirection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  toggleSettingsDirectionSelection,
  openPropertyDirectionModal,
  closePropertyDirectionModal,
  editPropertyDirection,
  toggleAllSettingDirectionSelection,
} = propertyDirectionSlice.actions;

export default propertyDirectionSlice.reducer;
