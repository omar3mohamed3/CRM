// productDetailsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { module_id, URL } from "../../Url/url"; // Ensure the URL is imported
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}module/${module_id()}/product-types/${productId}`, // Use the productId parameter in the URL
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Return the data from the response
      return response.data.data; // Assuming we only need the data array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch product details"
      );
    }
  }
);

// Create the productDetails slice
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Store the fetched product details
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
