import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import toast from "react-hot-toast";

// Async thunk to fetch categories with filters and pagination
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (
    { page = 1, search, date_from, date_to, service, assigned_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/categories`,
        {
          params: {
            page,
            search: search || null,
            date_from: date_from || null,
            date_to: date_to || null,
            assigned_to: assigned_to || null,
            category: service || null,
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

// Async thunk to fetch all categories without pagination
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/list/categories`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      const transformedData = response.data.data.map((item) => ({
        id: item.id,
        label: item.name,
      }));
      return transformedData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add a category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/categories`,
        categoryData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add category");
    }
  }
);

// Async thunk to update a category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${URL}modules/${module_id()}/categories/${categoryId}`,
        categoryData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { categoryId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a single category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/categories/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { categoryId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to bulk delete categories
export const deleteCategoriesBulk = createAsyncThunk(
  "categories/deleteCategoriesBulk",
  async ({ categoryIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/categories/bulk/delete-multiple`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: categoryIds },
        }
      );
      return { categoryIds, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    allCategories: [],
    selectedCategories: [],
    loading: false,
    allCategoriesLoading: false,
    addLoading: null,
    editedLoading: null,
    deleteLoading: null,
    editedCategory: null,
    error: null,
    errorAddCategory: null,
    isModalOpen: false,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    filters: {
      date_from: null,
      date_to: null,
      service: null,
      assigned_to: null,
      search: null,
    },
  },
  reducers: {
    toggleCategoriesSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedCategories.includes(id)) {
        state.selectedCategories = state.selectedCategories.filter(
          (categoryId) => categoryId !== id
        );
      } else {
        state.selectedCategories.push(id);
      }
    },
    toggleAllCategoriesSelection: (state, action) => {
      const allIds = action.payload;
      if (state.selectedCategories.length === allIds.length) {
        state.selectedCategories = [];
      } else {
        state.selectedCategories = allIds;
      }
    },
    editCategory: (state, action) => {
      state.editedCategory = action.payload;
    },
    openCategoriesModal: (state) => {
      state.isModalOpen = true;
    },
    closeCategoriesModal: (state) => {
      state.isModalOpen = false;
      state.editedCategory = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextCategoryPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;
      state.pagination.currentPage += 1;
    },
    setPreviousCategoryPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage -= 1;
    },
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        date_from: "",
        date_to: "",
        service: "",
        assigned_to: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.allCategoriesLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allCategoriesLoading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.allCategoriesLoading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.addLoading = true;
        state.errorAddCategory = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.addLoading = false;
        state.errorAddCategory = null;
        toast.success("Category added successfully");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.addLoading = false;
        state.errorAddCategory = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.editedLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.editedLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.editedLoading = false;
        state.error = action.payload || "Failed to update category";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { categoryId } = action.payload;
        state.categories = state.categories.filter(
          (category) => category.id !== categoryId
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete category";
      })
      .addCase(deleteCategoriesBulk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteCategoriesBulk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        const { categoryIds } = action.payload;
        state.categories = state.categories.filter(
          (category) => !categoryIds.includes(category.id)
        );
        state.selectedCategories = [];
      })
      .addCase(deleteCategoriesBulk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to bulk delete categories";
      });
  },
});

export const {
  toggleCategoriesSelection,
  toggleAllCategoriesSelection,
  openCategoriesModal,
  closeCategoriesModal,
  setCurrentPage,
  setNextCategoryPage,
  setPreviousCategoryPage,
  editCategory,
  setFilter,
  resetFilters,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
