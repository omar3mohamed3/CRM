import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk for fetching reminders
export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async ({ leadId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/${leadId}/reminders`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Assuming response.data.data is the array of reminders
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch reminders"
      );
    }
  }
);

// Async thunk for adding a reminder
export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async ({ leadId, reminderData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/${leadId}/reminders`,
        reminderData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.reminder; // Assuming response.data.reminder is the created reminder
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add reminder");
    }
  }
);

// Async thunk for editing a reminder
export const editReminder = createAsyncThunk(
  "reminders/editReminder",
  async ({ leadId, reminderId, reminderData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/leads/${leadId}/reminders/${reminderId}`,
        reminderData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.reminder; // Assuming response.data.reminder is the updated reminder
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update reminder"
      );
    }
  }
);

// Async thunk for deleting a reminder
export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async ({ reminderId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${URL}modules/${module_id()}/leads/reminders/${reminderId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return reminderId; // Returning the deleted reminder ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete reminder"
      );
    }
  }
);

// Slice
const reminderSlice = createSlice({
  name: "reminders",
  initialState: {
    reminders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reminders
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.reminders = action.payload;
        state.loading = false;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add reminder
      .addCase(addReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.reminders.push(action.payload); // Add the new reminder to the list
        state.loading = false;
      })
      .addCase(addReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit reminder
      .addCase(editReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReminder.fulfilled, (state, action) => {
        const index = state.reminders.findIndex(
          (rem) => rem.id === action.payload.id
        );
        if (index !== -1) {
          state.reminders[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete reminder
      .addCase(deleteReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.reminders = state.reminders.filter(
          (rem) => rem.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reminderSlice.reducer;
