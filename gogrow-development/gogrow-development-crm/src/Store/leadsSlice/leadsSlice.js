import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";
// Async thunk to fetch leads data with filtering parameters
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (
    { page = 1, search, date_from, date_to, source_id, status_id, assigned_to },
    { rejectWithValue }
  ) => {
    console.log("befor func");
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/details`,
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
      console.log("after func", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update a lead
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ leadId, leadData, productType }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/leads/${leadId}?product_type_id=${productType}`, // API endpoint for updating a specific lead
        { ...leadData }, // The updated lead data
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          // data: { test: "test" }, // Authorization headers
        }
      );
      return { leadId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk update leads
export const updateLeadsBulk = createAsyncThunk(
  "leads/updateLeadsBulk",
  async ({ leadIds, status_id, assigned_to }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/bulk-update`, // API endpoint for bulk update
        {
          leadIds, // Array of lead IDs to update
          status_id, // New status ID for the leads
          assigned_to, // New user ID to assign the leads to  
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }, // Authorization headers
        }
      );
      return { leadIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a single lead
export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/leads/${leadId}`,
        { 
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { leadId, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete multiple leads in bulk
export const deleteLeadsBulk = createAsyncThunk(
  "leads/deleteLeadsBulk",
  async (leadIds, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/leads`, // API endpoint for bulk delete
        {
          headers: { Authorization: `Bearer ${getToken()}` }, // Authorization headers
          data: { leadIds }, // Payload containing an array of lead IDs
        }
      );
      return { leadIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    selectedLeads: [],
    leadsData: [],
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
    toggleLeadSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedLeads.includes(id)) {
        state.selectedLeads = state.selectedLeads.filter(
          (leadId) => leadId !== id
        );
      } else {
        state.selectedLeads.push(id);
      }
    },
    toggleAllLeadsSelection: (state, action) => {
      const allIds = action.payload;
      if (state.selectedLeads.length === allIds.length) {
        state.selectedLeads = [];
      } else {
        state.selectedLeads = allIds;
      }
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextLeadPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousLeadPage: (state) => {
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
        source_id: "",
        status_id: [],
        assigned_to: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leadsData = action.payload.data.data;    
        
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
     console.log( response.payload.data.data)

      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle single lead update
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLead.fulfilled, (state) => {
        state.loading = false;
        toast.success("Lead has been updated");
        // const updatedLead = action.payload.data.data;

        // Update the specific lead in the leadsData array
        // state.leadsData = state.leadsData.map((lead) =>
        //   lead.id === updatedLead.id ? updatedLead : lead
        // );
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle single lead deletion
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadsData = state.leadsData.filter(
          (lead) => lead.id !== action.payload.leadId
        );
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle bulk deletion of leads
      .addCase(deleteLeadsBulk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLeadsBulk.fulfilled, (state, action) => {
        state.loading = false;
        const { leadIds } = action.payload;
        // Remove all leads whose IDs were in the leadIds array
        state.leadsData = state.leadsData.filter(
          (lead) => !leadIds.includes(lead.id)
        );
        // Clear the selected leads after bulk deletion
        state.selectedLeads = [];
      })
      .addCase(deleteLeadsBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLeadsBulk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeadsBulk.fulfilled, (state) => {
        state.loading = false;
        toast.success("Lead Updated Successfully");
        // const { leadIds, data } = action.payload;

        // Update the leads in the state based on the updated IDs
        // state.leadsData = state.leadsData.map((lead) => {
        //   if (leadIds.includes(lead.id)) {
        //     // Assuming the API response contains the updated lead data, merge it here
        //     return {
        //       ...lead,
        //       status_id: data.status_id, // Update status_id from the response
        //       assigned_to: data.assigned_to, // Update assigned_to from the response
        //     };
        //   }
        //   return lead;
        // });
      })
      .addCase(updateLeadsBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setNextLeadPage,
  setPreviousLeadPage,
  toggleLeadSelection,
  toggleAllLeadsSelection,
  setCurrentPage,
  setFilter,
  resetFilters,
} = leadsSlice.actions;

export default leadsSlice.reducer;
