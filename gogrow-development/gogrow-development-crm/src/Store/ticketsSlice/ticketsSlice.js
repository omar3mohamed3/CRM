// redux/ticketsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import axios from "axios";

// Async thunk to fetch tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/conversations`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the transformed data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a new message to a conversation
export const addMessage = createAsyncThunk(
  "tickets/addMessage",
  async ({ ticketId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/conversations/${ticketId}/messages`,
        message,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the added message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch messages for a specific ticket
export const fetchMessages = createAsyncThunk(
  "tickets/fetchMessages",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/conversations/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the messages
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a new ticket
export const statusTicket = createAsyncThunk(
  "tickets/statusTicket",
  async ({ ticketId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/conversations/${ticketId}/mark`,
        { status: status },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the added ticket
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to add a new ticket
export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/conversations`,
        ticketData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Return the added ticket
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    selectedTicket: null,
    messages: [], // Store messages for the selected ticket
    loading: false,
    error: null,
    loadingCreate: false,
    errorCreate: null,
    loadingMessage: false,
    errorMessage: null,
    loadingStatus: false,
    errorStatus: null,
  },
  reducers: {
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    clearMessages: (state) => {
      state.messages = []; // Clear messages when changing ticket
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMessage.pending, (state) => {
        state.loadingCreate = true;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.messages.messages.push(action.payload); // Add the new message
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.error.message;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loadingMessage = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingMessage = false;
        state.messages = action.payload; // Set the fetched messages
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingMessage = false;
        state.errorMessage = action.error.message;
      })
      .addCase(addTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload); // Add the new ticket
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(statusTicket.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(statusTicket.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.messages.status = action.payload.status;
      })
      .addCase(statusTicket.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = action.error.message;
      });
  },
});

export const { setSelectedTicket, clearMessages } = ticketsSlice.actions;
export default ticketsSlice.reducer;
