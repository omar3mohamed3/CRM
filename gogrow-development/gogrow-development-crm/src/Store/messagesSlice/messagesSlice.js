// redux/messagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { module_id, URL } from "../../Url/url";
import axios from "axios";
import { getToken } from "../DashBoard/dashboardSlice";

// Fake data for demonstration
const fakeMessages = {
  id: 1,
  ticketId: 1,
  title: "Help Needed For Payment Failure",
  messages: [
    {
      sender: { name: "not Go Grow", initials: "GG", role: "user" },
      timestamp: "23rd of June at 8:44",
      content: `
      <p>Hi,</p>
      <p>I need help to process the payment via my VISA card.</p>
      <p>Its returning failed payment after the checkout. I need to send out this campaign within today. Can you please help ASAP.</p>
      <p>Thanks</p>
    `,
      attachments: [
        { name: "doc.pdf", type: "pdf", size: "29 KB" },
        { name: "image.jpg", type: "image", size: "29 KB" },
      ],
    },
    {
      sender: { name: "Go Grow", initials: "GG", role: "admin" },
      timestamp: "23rd of June at 8:44",
      content: `
      <p>Hi,</p>
      <p>I need help to process the payment via my VISA card.</p>
      <p>Its returning failed payment after the checkout. I need to send out this campaign within today. Can you please help ASAP.</p>
      <p>Thanks</p>
    `,
      attachments: [
        { name: "doc.pdf", type: "pdf", size: "29 KB" },
        { name: "image.jpg", type: "image", size: "29 KB" },
      ],
    },
    // Add more fake messages as needed
  ],
};
// export const fetchMessages = createAsyncThunk(
//   "messages/fetchMessages",
//   async (id) => {
//     // Simulate API call
//     if (id) {
//       return new Promise((resolve) =>
//         setTimeout(() => resolve(fakeMessages), 1000)
//       );
//     }
//     return [];
//   }
// );

// Async thunk to fetch Teams
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ messageId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/conversations/${messageId}`,
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

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
