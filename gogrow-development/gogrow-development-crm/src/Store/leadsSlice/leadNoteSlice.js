import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

const baseUrl = `${URL}modules/1/leads/1489/notes`;

export const fetchNotes = createAsyncThunk(
  "leadNote/fetchNotes",
  async ({ leadId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leads/${leadId}/notes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data is the notes array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch notes");
    }
  }
);

export const addNote = createAsyncThunk(
  "leadNote/addNote",
  async ({ leadId, noteContent }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/leads/${leadId}/notes`,
        { content: noteContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data contains the new note object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add note");
    }
  }
);

export const editNote = createAsyncThunk(
  "leadNote/editNote",
  async ({ leadId, noteId, content }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/leads/${leadId}/notes/${noteId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Assuming response.data contains the updated note object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit note");
    }
  }
);

export const deleteNote = createAsyncThunk(
  "leadNote/deleteNote",
  async ({ leadId, noteId }, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      await axios.delete(
        `${URL}modules/${module_id()}/leads/${leadId}/notes/${noteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return noteId; // Return the noteId for deleting from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete note");
    }
  }
);

const leadNoteSlice = createSlice({
  name: "leadNote",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        toast.success("The note deleted successly");
      });
  },
});

export default leadNoteSlice.reducer;
