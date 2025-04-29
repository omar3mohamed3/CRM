// src/store/leadsSlice.js
import toast from "react-hot-toast";
import productPhoto from "/Logo.png";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { module_id, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { page = 1, search, date_from, date_to, service, assigned_to },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/products`,
        {
          params: {
            page: page ? page : 1,
            search: search ? search : null,
            date_from: date_from ? date_from : null,
            date_to: date_to ? date_to : null,
            category_id: service ? service : null,
            // assigned_to: assigned_to ? assigned_to : null,
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
// Async thunk to fetch show product
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/products/${productId}`,
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

// Async thunk to fetch produts
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}modules/${module_id()}/leadproducts/list/all`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const transformedData = response.data.data.map((item) => ({
        id: item.id,
        label: item.name,
      }));
      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ productData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/items`,
        productData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create product"
      );
    }
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${URL}modules/${module_id()}/products/${productId}`,
        productData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { productId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product"
      );
    }
  }
);

// Async thunk to delete a single product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return { productId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete product"
      );
    }
  }
);

// Async thunk to bulk delete products
export const deleteProductsBulk = createAsyncThunk(
  "products/deleteProductsBulk",
  async ({ productIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${URL}modules/${module_id()}/products`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { ids: productIds },
        }
      );
      return { productIds, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to bulk delete products"
      );
    }
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Data from api
    product: {}, // Data from api
    allCategories: [],
    productsServices: [], // Selected to Bulk
    loading: false,
    createLoading: false,
    editedProduct: null, // Service ID and data  To edit
    error: null,
    isModalOpen: false, // Open Edit Modal
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
    toggleProductsSelection: (state, action) => {
      const id = action.payload;
      if (state.productsServices.includes(id)) {
        state.productsServices = state.productsServices.filter(
          (leadId) => leadId !== id
        );
      } else {
        state.productsServices.push(id);
      }
    },
    toggleAllProductsSelection: (state, action) => {
      const allIds = action.payload;
      if (state.productsServices.length === allIds.length) {
        state.productsServices = [];
      } else {
        state.productsServices = allIds;
      }
    },
    editProduct: (state, action) => {
      state.editedProduct = action.payload;
    },
    openProductModal: (state) => {
      state.isModalOpen = true;
    },
    closeProductModal: (state) => {
      state.isModalOpen = false;
      state.editedProduct = null;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setNextProductPage: (state) => {
      if (state.pagination.currentPage >= state.pagination.lastPage) return;

      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousProductPage: (state) => {
      if (state.pagination.currentPage === 1) return;
      state.pagination.currentPage = state.pagination.currentPage - 1;
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
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.data;
        state.pagination = {
          currentPage: action.payload.data.current_page,
          lastPage: action.payload.data.last_page,
          perPage: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Show Product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get List  of Services
      .addCase(fetchAllProducts.pending, (state) => {
        state.allProductsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProductsLoading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProductsLoading = false;
        state.error = action.error.message;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId } = action.payload;
        state.products = state.products.filter(
          (product) => product.id !== productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Bulk Delete Products
      .addCase(deleteProductsBulk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductsBulk.fulfilled, (state, action) => {
        state.loading = false;
        const { productIds } = action.payload;
        state.products = state.products.filter(
          (product) => !productIds.includes(product.id)
        );
        state.selectedProducts = [];
      })
      .addCase(deleteProductsBulk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleProductsSelection,
  openProductModal,
  closeProductModal,
  editProduct,
  toggleAllProductsSelection,
  setCurrentPage,
  setFilter,
  setNextProductPage,
  setPreviousProductPage,
  resetFilters,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
