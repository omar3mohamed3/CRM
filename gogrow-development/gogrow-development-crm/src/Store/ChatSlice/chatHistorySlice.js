import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../DashBoard/dashboardSlice"; // Update this path accordingly
import { URL } from "../../Url/url";

// Async thunk to fetch teams with last messages
export const fetchTeamsWithLastMessage = createAsyncThunk(
  "chatHistory/fetchTeamsWithLastMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}teams/history-last-message`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.teams;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch team messages
export const getTeamMessages = createAsyncThunk(
  "chat/getTeamMessages",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}team-chat/${teamId}/messages`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.messages; // Return the messages data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch users with last messages
export const fetchUsersWithLastMessage = createAsyncThunk(
  "chatHistory/fetchUsersWithLastMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}users/history-last-message`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to fetch chat history users
export const fetchHistoryUsers = createAsyncThunk(
  "chatHistory/fetchHistoryUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}history/all-users/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      return response.data.users; // Return the users data from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPrivateChat = createAsyncThunk(
  "chat/fetchPrivateChat",
  async ({ userId, otherUserId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}history/private-chat/${userId}/to/${otherUserId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data.messages; // Return the messages array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: {
    teams: [],
    users: [],
    historyUsers: [],
    messagesChat: [],
    selectedChat: null, // To Store The Selected Chat Id
    loading: false,
    error: null,
    chatType: "users", // 'users' or 'teams'
  },
  reducers: {
    setChatType: (state, action) => {
      state.chatType = action.payload;
    },
    selectChatsOfUser: (state, action) => {
      state.selectedChat = action.payload;
    },
    resetChatHistory: (state) => {
      state.teams = [];
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Teams fetch handlers
      .addCase(fetchTeamsWithLastMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeamsWithLastMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeamsWithLastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch team messages
      .addCase(getTeamMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeamMessages.fulfilled, (state, action) => {
        state.loading = false;

        state.messagesChat = action.payload; // Set messages for selected team
      })
      .addCase(getTeamMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Users fetch handlers
      .addCase(fetchUsersWithLastMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersWithLastMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersWithLastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch history users
      .addCase(fetchHistoryUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.historyUsers = action.payload; // Set users data
      })
      .addCase(fetchHistoryUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if fetching fails
      })

      // Fetch history users
      .addCase(fetchPrivateChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrivateChat.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesChat = action.payload; // Set the messages in the state
      })
      .addCase(fetchPrivateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if fetching fails
      });
  },
});

// Exporting actions and reducer
export const { setChatType, resetChatHistory, selectChatsOfUser } =
  chatHistorySlice.actions;
export default chatHistorySlice.reducer;
