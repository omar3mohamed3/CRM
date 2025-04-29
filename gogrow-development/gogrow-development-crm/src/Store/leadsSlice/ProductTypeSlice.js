// productTypeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../../Url/url"; // Ensure the URL is imported
import { getToken } from "../DashBoard/dashboardSlice";

// Async thunk to fetch product types
export const fetchProductTypes = createAsyncThunk(
  "productType/fetchProductTypes",
  async (_, { rejectWithValue }) => {
    const token = getToken(); // Retrieve token dynamically
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${URL}module/product-types`, // Update the URL as per your local variable
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Transform the response into { value: id, label: type_name } format
      const transformedData = response.data.data.map((productType) => ({
        id: productType.id,
        label: productType.name,
      }));

      return transformedData; // Return the transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch product types"
      );
    }
  }
);

// Create the productType slice
const productTypeSlice = createSlice({
  name: "productType",
  initialState: {
    productTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.loading = false;

        state.productTypes = action.payload; // Store the transformed product types
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productTypeSlice.reducer;
