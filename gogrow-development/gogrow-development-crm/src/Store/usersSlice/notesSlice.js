import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Base URL for your API

// Fetch notes for a specific user
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/user-notes`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Assuming your notes data is in `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ note }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/user-notes`,
        note,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Assuming the new note data is returned in `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit a note
export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ noteId, updatedNote }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/user-notes/${noteId}`,
        { note: updatedNote },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.data; // Assuming the updated note data is in `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ userId, noteId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}modules/${module_id()}/user-notes/${noteId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return noteId; // Return the ID of the deleted note to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Note Slice
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    addloading: false,
    deleteloading: false,
    error: null,
  },
  reducers: {
    // Optionally add some synchronous reducers if needed
  },
  extraReducers: (builder) => {
    // Fetch notes
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload; // Store the fetched notes
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create note
    builder
      .addCase(createNote.pending, (state) => {
        state.addloading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.addloading = false;
        state.notes.push(action.payload); // Add the newly created note to the state
      })
      .addCase(createNote.rejected, (state, action) => {
        state.addloading = false;
        state.error = action.payload;
      });

    // Edit note
    builder
      .addCase(editNote.pending, (state) => {
        state.addloading = true;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.addloading = false;
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload; // Update the note in the state
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.addloading = false;
        state.error = action.payload;
      });

    // Delete note
    builder
      .addCase(deleteNote.pending, (state) => {
        state.deleteloading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.deleteloading = false;
        toast.success("Note has been deleted");
        state.notes = state.notes.filter((note) => note.id !== action.payload); // Remove the deleted note
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteloading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
