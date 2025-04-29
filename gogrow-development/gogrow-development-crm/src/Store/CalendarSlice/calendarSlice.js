// src/redux/calendarSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch calendar events using axios
export const fetchCalendarEvents = createAsyncThunk(
  "calendar/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}meetings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }); // Replace with your API endpoint
      return response.data; // Return the data (adjust if your API structure differs)
    } catch (error) {
      // Check if the error is response-related or other
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Request was made but no response
        return rejectWithValue("No response from the server");
      } else {
        // Something else went wrong
        return rejectWithValue(error.message);
      }
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload; // Assuming the response data contains events
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong"; // Error message from rejectWithValue or fallback
      });
  },
});

export const selectCalendarEvents = (state) => state.calendar.events;

export default calendarSlice.reducer;
