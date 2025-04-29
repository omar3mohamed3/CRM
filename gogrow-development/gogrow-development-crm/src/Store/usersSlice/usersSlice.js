import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk to fetch users data with search and pagination
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/all_index/users`,
        {
          params: {
            page,
            search: search ? search : null,
          },
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch all users without pagination (for dropdowns, etc.)
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/users/list-all`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const transformedData = response.data.data.map((user) => ({
        id: user.id,
        label: user.fullName,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/users`,
        userData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to add user");
    }
  }
);

// Async thunk to update a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/users/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to Toggle a user
export const activeUser = createAsyncThunk(
  "users/activeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${URL}modules/${module_id()}/users/${userId}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { userId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete users
export const deleteUsersBulk = createAsyncThunk(
  "users/deleteUsersBulk",
  async (userIds, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/bulk/users/multi-delete`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { user_ids: userIds }, // Payload containing an array of user IDs
        }
      );
      return { userIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    allUsers: [],
    selectedUsers: [],
    loading: false,
    loadingAdd: false,
    allUsersLoading: false,
    errorAdd: null,
    error: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    search: "",
    errorActive: null,
    loadigActive: null,
  },
  reducers: {
    toggleUsersSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedUsers.includes(id)) {
        state.selectedUsers = state.selectedUsers.filter(
          (userId) => userId !== id
        );
      } else {
        state.selectedUsers.push(id);
      }
    },
    toggleAllUsersSelection: (state, action) => {
      const allIds = action.payload;
      if (state.selectedUsers.length === allIds.length) {
        state.selectedUsers = [];
      } else {
        state.selectedUsers = allIds;
      }
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextUserPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage += 1;
    },
    setPreviousUserPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage -= 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.allUsersLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsersLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.allUsersLoading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loadingAdd = true;
        state.errorAdd = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loadingAdd = false;
        toast.success("User added successfully");
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorAdd = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.userId
        );
      })
      .addCase(activeUser.pending, (state) => {
        state.loadigActive = true;
        state.errorActive = null;
      })
      .addCase(activeUser.fulfilled, (state, action) => {
        //state.users = state.users.filter(
        //  (user) => user.id !== action.payload.userId
        // );
        state.loadigActive = false;
        toast.success("User  activation has been changed");
      })
      .addCase(activeUser.rejected, (state, action) => {
        state.loadigActive = false;
        state.errorActive = action.payload;
      })
      .addCase(deleteUsersBulk.fulfilled, (state, action) => {
        const { userIds } = action.payload;
        state.users = state.users.filter((user) => !userIds.includes(user.id));
        state.selectedUsers = []; // Clear selected users after bulk deletion
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
  },
});

export const {
  toggleUsersSelection,
  toggleAllUsersSelection,
  setNextUserPage,
  setPreviousUserPage,
  setCurrentPage,
  setSearch,
} = usersSlice.actions;

export default usersSlice.reducer;
