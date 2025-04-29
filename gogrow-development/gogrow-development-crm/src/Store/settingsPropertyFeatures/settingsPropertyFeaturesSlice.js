import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url"; // Update with your URL
import { getToken } from "../DashBoard/dashboardSlice"; // Update import if necessary
import toast from "react-hot-toast";

// Async thunk to fetch property features
export const fetchSettingsPropertyFeatures = createAsyncThunk(
  "propertyFeatures/fetchSettingsPropertyFeatures",
  async ({ page = 1, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/property-features`, // Update endpoint as needed
        {
          params: {
            page,
            search: search || null,
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
// Async thunk to fetch property features
export const fetchSettingsAllPropertyFeatures = createAsyncThunk(
  "propertyFeatures/fetchSettingsAllPropertyFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/property-features/all`, // Update endpoint as needed
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a property feature
export const createPropertyFeature = createAsyncThunk(
  "propertyFeatures/createPropertyFeature",
  async ({ propertyData }, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/property-features`, // Update endpoint as needed
        propertyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add property feature"
      );
    }
  }
);

// Async thunk to update a property feature
export const updatePropertyFeature = createAsyncThunk(
  "propertyFeatures/updatePropertyFeature",
  async ({ featureId, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/property-features/${featureId}`, // Update endpoint as needed
        propertyData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { featureId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete property features in bulk
export const deletePropertyFeaturesBulk = createAsyncThunk(
  "propertyFeatures/deletePropertyFeaturesBulk",
  async ({ propertyFeatureIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/batch-delete/property-features`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: propertyFeatureIds },
        }
      );
      return { propertyFeatureIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a property feature
export const deletePropertyFeature = createAsyncThunk(
  "propertyFeatures/deletePropertyFeature",
  async (featureId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/property-features/${featureId}`, // Update endpoint as needed
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { featureId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertyFeaturesSlice = createSlice({
  name: "propertyFeatures",
  initialState: {
    settingsPropertyFeatures: [], // Data from API
    settingsAllPropertyFeatures: [], // Data from API
    settingsPropertyFeaturesBulk: [], // Selected for bulk actions
    loading: false,
    addLoading: false,
    deleteLoading: false,
    editedFeature: null, // Property Feature ID and data to edit
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
    toggleSettingsFeatureSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsPropertyFeaturesBulk.includes(id)) {
        state.settingsPropertyFeaturesBulk =
          state.settingsPropertyFeaturesBulk.filter(
            (featureId) => featureId !== id
          );
      } else {
        state.settingsPropertyFeaturesBulk.push(id);
      }
    },
    toggleAllSettingFeaturesSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsPropertyFeaturesBulk.length === allIds.length) {
        state.settingsPropertyFeaturesBulk = [];
      } else {
        state.settingsPropertyFeaturesBulk = allIds;
      }
    },
    editPropertyFeature: (state, action) => {
      state.editedFeature = action.payload;
    },
    openPropertyFeaturesModal: (state) => {
      state.isModalOpen = true;
    },
    closePropertyFeaturesModal: (state) => {
      state.isModalOpen = false;
      state.editedFeature = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextFeaturePage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage += 1;
    },
    setPreviousFeaturePage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage -= 1;
    },
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Property Features
      .addCase(fetchSettingsPropertyFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsPropertyFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsPropertyFeatures = action.payload.data.data; // Update according to API response structure
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchSettingsPropertyFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSettingsAllPropertyFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsAllPropertyFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsAllPropertyFeatures = action.payload.data; // Update according to API response structure
      })
      .addCase(fetchSettingsAllPropertyFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Property Feature
      .addCase(createPropertyFeature.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(createPropertyFeature.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Property feature added successfully");
      })
      .addCase(createPropertyFeature.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      // Update Property Feature
      .addCase(updatePropertyFeature.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(updatePropertyFeature.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Property feature updated successfully");
      })
      .addCase(updatePropertyFeature.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || "Failed to update property feature";
      })
      // Delete Property Feature
      .addCase(deletePropertyFeature.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePropertyFeature.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { featureId } = action.payload;
        state.settingsPropertyFeatures = state.settingsPropertyFeatures.filter(
          (feature) => feature.id !== featureId
        );
      })
      .addCase(deletePropertyFeature.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete property feature";
      }) // Bulk Delete Property Features
      .addCase(deletePropertyFeaturesBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropertyFeaturesBulk.fulfilled, (state, action) => {
        state.loading = false;
        const { propertyFeatureIds } = action.payload;
        state.settingsPropertyFeatures = state.settingsPropertyFeatures.filter(
          (feature) => !propertyFeatureIds.includes(feature.id)
        );
        state.settingsPropertyFeaturesBulk = []; // Clear the bulk selection
        toast.success("Property features deleted successfully");
      })
      .addCase(deletePropertyFeaturesBulk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to bulk delete property features";
      });
  },
});

export const {
  toggleSettingsFeatureSelection,
  openPropertyFeaturesModal,
  closePropertyFeaturesModal,
  editPropertyFeature,
  setCurrentPage,
  setFilter,
  resetFilters,
  setNextFeaturePage,
  setPreviousFeaturePage,
  toggleAllSettingFeaturesSelection,
} = propertyFeaturesSlice.actions;

export default propertyFeaturesSlice.reducer;
