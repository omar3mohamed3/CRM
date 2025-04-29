import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (
    { page = 1, search, date_from, date_to, service, assigned_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/properties`,
        {
          params: {
            page: page ? page : 1,
            search: search ? search : null,
            date_from: date_from ? date_from : null,
            date_to: date_to ? date_to : null,
            assigned_to: assigned_to ? assigned_to : null,
            property: service ? service : null,
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

// Async thunk to fetch single property
export const fetchProperty = createAsyncThunk(
  "properties/fetchProperty",
  async ({ propertyId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/properties/${propertyId}`,
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

// Async thunk to fetch all properties list
export const fetchAllProperties = createAsyncThunk(
  "properties/fetchAllProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/properties/all`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const transformedData = response.data.data.map((item) => ({
        id: item.id,
        label: item.title,
      }));
      return transformedData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a property
export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async ({ propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/properties`,
        propertyData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create property"
      );
    }
  }
);

// Async thunk to update a property
export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ propertyId, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/properties/${propertyId}/update`,
        propertyData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { propertyId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update property"
      );
    }
  }
);

// Async thunk to delete a property
export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/properties/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { propertyId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete property"
      );
    }
  }
);

// Async thunk to bulk delete properties
export const deletePropertiesBulk = createAsyncThunk(
  "properties/deletePropertiesBulk",
  async ({ propertyIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/properties`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: propertyIds },
        }
      );
      return { propertyIds, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to bulk delete properties"
      );
    }
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    properties: [], // Data from api
    property: {}, // Single property data
    allProperties: [],
    propertiesServices: [], // Selected for bulk actions
    loading: false,
    createLoading: false,
    editedProperty: null,
    error: null,
    isModalOpen: false,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    filters: {
      date_from: null,
      date_to: null,
      service: null,
      assigned_to: null,
      search: null,
    },
  },
  reducers: {
    togglePropertiesSelection: (state, action) => {
      const id = action.payload;
      if (state.propertiesServices.includes(id)) {
        state.propertiesServices = state.propertiesServices.filter(
          (propertyId) => propertyId !== id
        );
      } else {
        state.propertiesServices.push(id);
      }
    },
    toggleAllPropertiesSelection: (state, action) => {
      const allIds = action.payload;
      if (state.propertiesServices.length === allIds.length) {
        state.propertiesServices = [];
      } else {
        state.propertiesServices = allIds;
      }
    },
    editProperty: (state, action) => {
      state.editedProperty = action.payload;
    },
    openPropertyModal: (state) => {
      state.isModalOpen = true;
    },
    closePropertyModal: (state) => {
      state.isModalOpen = false;
      state.editedProperty = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextPropertyPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousPropertyPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        date_from: "",
        date_to: "",
        service: "",
        assigned_to: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Property
      .addCase(fetchProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.data;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Properties List
      .addCase(fetchAllProperties.pending, (state) => {
        state.allPropertiesLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.allPropertiesLoading = false;
        state.allProperties = action.payload;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.allPropertiesLoading = false;
        state.error = action.error.message;
      })
      // Create Property
      .addCase(createProperty.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.createLoading = false;
        toast.success("Property added successfully");
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Update Property
      .addCase(updateProperty.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state) => {
        state.createLoading = false;
        toast.success("Property updated successfully");
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        const { propertyId } = action.payload;
        state.properties = state.properties.filter(
          (property) => property.id !== propertyId
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Bulk Delete Properties
      .addCase(deletePropertiesBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropertiesBulk.fulfilled, (state, action) => {
        state.loading = false;
        const { propertyIds } = action.payload;
        state.properties = state.properties.filter(
          (property) => !propertyIds.includes(property.id)
        );
        state.propertiesServices = [];
        toast.success("Properties deleted successfully");
      })
      .addCase(deletePropertiesBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  togglePropertiesSelection,
  toggleAllPropertiesSelection,
  editProperty,
  openPropertyModal,
  closePropertyModal,
  setCurrentPage,
  setNextPropertyPage,
  setPreviousPropertyPage,
  setFilter,
  resetFilters,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
