import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch teams with last messages
export const fetchTeamsWithLastMessage = createAsyncThunk(
  "chat/fetchTeamsWithLastMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}teams/with-last-message`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.teams; // Return the teams data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch users with last messages
export const fetchUsersWithLastMessage = createAsyncThunk(
  "chat/fetchUsersWithLastMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}users/with-last-message`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.users; // Return the users data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    teams: [],
    users: [],
    messagesChat: [],
    otherUserData: "",
    chatType: "users", //teams or users
    selectedChat: null, // To Store The Selected Chat Id
    sender: null,
    senderTo: null, // To Store The Other User Id Or Team Id
    loading: false,
    error: null,
  },
  reducers: {
    resetChat: (state) => {
      state.teams = [];
      state.users = [];
      state.loading = false;
      state.error = null;
    },
    selectOtherUserData: (state, action) => {
      state.otherUserData = action.payload;
    },
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    selectSender: (state, action) => {
      state.sender = action.payload;
    },
    selectOtherUser: (state, action) => {
      state.senderTo = action.payload;
    },
    // Using To Check if Messages Changed TO Update Chat List
    getMessages: (state, action) => {
      state.messagesChat = action.payload;
    },
    setChatType: (state, action) => {
      state.chatType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teams
      .addCase(fetchTeamsWithLastMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamsWithLastMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload; // Set teams data
      })
      .addCase(fetchTeamsWithLastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if fetching fails
      })
      // Fetch users
      .addCase(fetchUsersWithLastMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersWithLastMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Set users data
      })
      .addCase(fetchUsersWithLastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if fetching fails
      });
  },
});

// Export actions and reducer
export const {
  resetChat,
  selectChat,
  selectSender,
  selectOtherUser,
  getMessages,
  setChatType,
  selectOtherUserData,
} = chatSlice.actions;
export default chatSlice.reducer;
