import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url"; // Update with your URL
import { getToken } from "../DashBoard/dashboardSlice"; // Update import if necessary
import toast from "react-hot-toast";

// Async thunk to fetch property types
export const fetchSettingsPropertyType = createAsyncThunk(
  "propertyType/fetchSettingsPropertyType",
  async ({ page = 1, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/unit-types`, // Update endpoint as needed
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
// Async thunk to fetch property types
export const fetchSettingsAllPropertyType = createAsyncThunk(
  "propertyType/fetchSettingsAllPropertyType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/unit-types/all`, // Update endpoint as needed
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      // Transform the response into { value: id, label: name } format
      const transformedData = response.data.data.map((country) => ({
        id: country.id,
        label: country.name,
      }));
      return transformedData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a property type
export const createPropertyType = createAsyncThunk(
  "propertyType/createPropertyType",
  async ({ propertyData }, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/unit-types`, // Update endpoint as needed
        propertyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add property type"
      );
    }
  }
);

// Async thunk to update a property type
export const updatePropertyType = createAsyncThunk(
  "propertyType/updatePropertyType",
  async ({ propertyId, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/unit-types/${propertyId}`, // Update endpoint as needed
        propertyData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { propertyId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to delete property types in bulk
export const deletePropertyTypesBulk = createAsyncThunk(
  "propertyType/deletePropertyTypesBulk",
  async ({ propertyTypeIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/unit-types/delete-multiple`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: propertyTypeIds },
        }
      );
      return { propertyTypeIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to delete a property type
export const deletePropertyType = createAsyncThunk(
  "propertyType/deletePropertyType",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/unit-types/${propertyId}`, // Update endpoint as needed
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { propertyId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertyTypeSlice = createSlice({
  name: "propertyType",
  initialState: {
    settingsPropertyType: [], // Data from API
    settingsAllPropertyType: [], // Data from API
    settingsPropertyTypeBulk: [], // Selected for bulk actions
    loadingAll: false,
    errorAll: null,
    loading: false,
    addLoading: false,
    deleteLoading: false,
    editedType: null, // Property Type ID and data to edit
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
    toggleSettingsTypeSelection: (state, action) => {
      const id = action.payload;
      if (state.settingsPropertyTypeBulk.includes(id)) {
        state.settingsPropertyTypeBulk = state.settingsPropertyTypeBulk.filter(
          (typeId) => typeId !== id
        );
      } else {
        state.settingsPropertyTypeBulk.push(id);
      }
    },
    toggleAllSettingTypeSelection: (state, action) => {
      const allIds = action.payload;
      if (state.settingsPropertyTypeBulk.length === allIds.length) {
        state.settingsPropertyTypeBulk = [];
      } else {
        state.settingsPropertyTypeBulk = allIds;
      }
    },
    editPropertyType: (state, action) => {
      state.editedType = action.payload;
    },
    openPropertyTypeModal: (state) => {
      state.isModalOpen = true;
    },
    closePropertyTypeModal: (state) => {
      state.isModalOpen = false;
      state.editedType = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextUnitTypePage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousUnitTypePage: (state) => {
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
      // Fetch Property All Types
      .addCase(fetchSettingsAllPropertyType.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
      })
      .addCase(fetchSettingsAllPropertyType.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.settingsAllPropertyType = action.payload; // Update according to API response structure
      })
      .addCase(fetchSettingsAllPropertyType.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.error.message;
      })
      // Fetch PropertType Pagainted
      .addCase(fetchSettingsPropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsPropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.settingsPropertyType = action.payload.data.data; // Update according to API response structure
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchSettingsPropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Property Type
      .addCase(createPropertyType.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(createPropertyType.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Property type added successfully");
      })
      .addCase(createPropertyType.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })
      // Update Property Type
      .addCase(updatePropertyType.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(updatePropertyType.fulfilled, (state) => {
        state.addLoading = false;
        toast.success("Property type updated successfully");
      })
      .addCase(updatePropertyType.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload || "Failed to update property type";
      })
      // Delete Property Type
      .addCase(deletePropertyType.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePropertyType.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { propertyId } = action.payload;
        state.settingsPropertyType = state.settingsPropertyType.filter(
          (type) => type.id !== propertyId
        );
      })
      .addCase(deletePropertyType.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete property type";
      }) // Bulk Delete Property Types
      .addCase(deletePropertyTypesBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropertyTypesBulk.fulfilled, (state, action) => {
        state.loading = false;
        const { propertyTypeIds } = action.payload;
        state.settingsPropertyType = state.settingsPropertyType.filter(
          (property) => !propertyTypeIds.includes(property.id)
        );
        state.settingsPropertyTypeBulk = []; // Clear the bulk selection
        toast.success("Property types deleted successfully");
      })
      .addCase(deletePropertyTypesBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to bulk delete property types";
      });
  },
});

export const {
  toggleSettingsTypeSelection,
  openPropertyTypeModal,
  closePropertyTypeModal,
  editPropertyType,
  setCurrentPage,
  setFilter,
  resetFilters,
  setNextUnitTypePage,
  setPreviousUnitTypePage,
  toggleAllSettingTypeSelection,
} = propertyTypeSlice.actions;

export default propertyTypeSlice.reducer;
