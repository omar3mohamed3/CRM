import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Make sure axios is imported
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";
// Async thunk to fetch services
export const fetchService = createAsyncThunk(
  "services/fetchService",
  async (
    { page = 1, search, date_from, date_to, service, assigned_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leadservices`,
        {
          params: {
            page: page ? page : 1,
            search: search ? search : null,
            date_from: date_from ? date_from : null,
            date_to: date_to ? date_to : null,
            service: service ? service : null,
            assigned_to: assigned_to ? assigned_to : null,
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

// Async thunk to fetch services
export const fetchAllService = createAsyncThunk(
  "services/fetchAllService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leadservices/list/all`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const transformedData = response.data.data.map((item) => ({
        id: item.id,
        label: item.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a lead
export const createServices = createAsyncThunk(
  "services/createServices",
  async ({ serviceData }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leadservices`, // API endpoint
        serviceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data; // Return the added lead data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add lead");
    }
  }
);

// Async thunk to update a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ serviceId, serviceData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/leadservices/${serviceId}`, // API endpoint for updating a specific service
        { ...serviceData },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { serviceId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a single service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/leadservices/${serviceId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { serviceId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete services
export const deleteServicesBulk = createAsyncThunk(
  "services/deleteServicesBulk",
  async ({ serviceIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/leadservices/delete-multiple`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: serviceIds },
        }
      );
      return { serviceIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    allServices: [],
    selectedServices: [],
    loading: false,
    allServicesLoading: false,
    editedLoading: null,
    addLoading: null,
    deleteLoading: null,
    editedService: null,
    error: null,
    errorAddService: null,
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
    toggleServicesSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedServices.includes(id)) {
        state.selectedServices = state.selectedServices.filter(
          (serviceId) => serviceId !== id
        );
      } else {
        state.selectedServices.push(id);
      }
    },
    toggleAllServicesSelection: (state, action) => {
      const allIds = action.payload;
      if (state.selectedServices.length === allIds.length) {
        state.selectedServices = [];
      } else {
        state.selectedServices = allIds;
      }
    },
    editService: (state, action) => {
      state.editedService = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editedService = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextServicePage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousServicePage: (state) => {
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
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get List  of Services
      .addCase(fetchAllService.pending, (state) => {
        state.allServicesLoading = true;
        state.error = null;
      })
      .addCase(fetchAllService.fulfilled, (state, action) => {
        state.allServicesLoading = false;
        state.allServices = action.payload;
      })
      .addCase(fetchAllService.rejected, (state, action) => {
        state.allServicesLoading = false;
        state.error = action.error.message;
      })
      // Create Service
      .addCase(createServices.pending, (state) => {
        state.addLoading = true;
        state.errorAddService = null;
      })
      .addCase(createServices.fulfilled, (state) => {
        state.addLoading = false;
        state.errorAddService = null;
        toast.success("Service added successfully");
      })
      .addCase(createServices.rejected, (state, action) => {
        state.addLoading = false;
        state.errorAddService = action.payload;
      })

      // Update Service

      .addCase(updateService.pending, (state) => {
        state.editedLoading = true;
        state.error = null;
      })

      .addCase(updateService.fulfilled, (state) => {
        state.editedLoading = false;
        // const { serviceId, data } = action.payload;
        // const index = state.services.findIndex((s) => s.id === serviceId);
        // if (index !== -1) {
        //   state.services[index] = { ...state.services[index], ...data };
        // }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.editedLoading = false;
        state.error = action.payload || "Failed to update service";
      })

      // Delete Single Service

      .addCase(deleteService.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { serviceId } = action.payload;
        state.services = state.services.filter(
          (service) => service.id !== serviceId
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete service";
      })

      // Bulk Delete Services

      .addCase(deleteServicesBulk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteServicesBulk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { serviceIds } = action.payload;
        state.services = state.services.filter(
          (service) => !serviceIds.includes(service.id)
        );
        state.selectedServices = [];
      })
      .addCase(deleteServicesBulk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to bulk delete services";
      });
  },
});

export const {
  toggleServicesSelection,
  toggleAllServicesSelection,
  editService,
  openModal,
  closeModal,
  setCurrentPage,
  setFilter,
  setNextServicePage,
  setPreviousServicePage,
  resetFilters,
} = servicesSlice.actions;

export default servicesSlice.reducer;
