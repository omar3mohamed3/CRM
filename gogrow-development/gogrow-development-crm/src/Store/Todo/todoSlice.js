import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}modules/${module_id()}/todos`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/todos`,
        {
          task: text,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/todos/${id}`,
        { task: text },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}modules/${module_id()}/todos/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for toggling a todo
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id, { getState, rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${URL}modules/${module_id()}/todos/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for marking all todos
export const markAllTodos = createAsyncThunk(
  "todos/markAllTodos",
  async (markAll, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const updatePromises = state.todos.items.map((todo) =>
        axios.post(
          `${URL}modules/${module_id()}/todos/${todo.id}`,
          {
            complete: markAll,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        )
      );
      const responses = await Promise.all(updatePromises);
      return responses.map((response) => response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: "all",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success("New Task has been added");
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
        toast.success("Task has been deleted");
      })
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      })
      // Mark all todos
      .addCase(markAllTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer;
