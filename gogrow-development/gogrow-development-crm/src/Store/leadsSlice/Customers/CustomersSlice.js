import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../../Url/url";
import { getToken } from "../../DashBoard/dashboardSlice";

// Async thunk to fetch customers data with filtering parameters
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (
    { page = 1, search, date_from, date_to, source_id, status_id, assigned_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/customers`,
        {
          params: {
            page,
            search: search ? search : null,
            date_from: date_from ? date_from : null,
            date_to: date_to ? date_to : null,
            source_id: source_id ? source_id : null,
            status_id: status_id ? status_id : null,
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

// Async thunk to delete a single customer
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/customers/${customerId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { customerId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    // selectedCustomers: [],
    customersData: [],
    loading: false,
    error: null,
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
      source_id: null,
      status_id: null,
      assigned_to: null,
      search: null,
    },
  },
  reducers: {
    // toggleCustomerSelection: (state, action) => {
    //   const id = action.payload;
    //   if (state.selectedCustomers.includes(id)) {
    //     state.selectedCustomers = state.selectedCustomers.filter(
    //       (customerId) => customerId !== id
    //     );
    //   } else {
    //     state.selectedCustomers.push(id);
    //   }
    // },
    // toggleAllCustomersSelection: (state, action) => {
    //   const allIds = action.payload;
    //   if (state.selectedCustomers.length === allIds.length) {
    //     state.selectedCustomers = [];
    //   } else {
    //     state.selectedCustomers = allIds;
    //   }
    // },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextCustomerPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousCustomerPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
    // setFilter: (state, action) => {
    //   state.filters = action.payload;
    // },
    // resetFilters: (state) => {
    //   state.filters = {
    //     search: "",
    //     date_from: "",
    //     date_to: "",
    //     source_id: "",
    //     status_id: [],
    //     assigned_to: "",
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customersData = action.payload.data.data;

        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle single customer deletion
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customersData = state.customersData.filter(
          (customer) => customer.id !== action.payload.customerId
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setNextCustomerPage,
  setPreviousCustomerPage,
  toggleCustomerSelection,
  toggleAllCustomersSelection,
  setCurrentPage,
  setFilter,
  resetFilters,
} = customersSlice.actions;

export default customersSlice.reducer;
