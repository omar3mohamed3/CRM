// src/store/leadsSlice.js
import productPhoto from "/Logo.png";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Simulate fetching a service by ID
export const fetchReports = createAsyncThunk(
  "reports/fetchreports",
  async () => {
    return tableData;
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [], // Data from api

    loading: false,

    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer;

const tableData = [
  {
    id: "1",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "2",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "3",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "4",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "5",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
  {
    id: "6",
    Photo: productPhoto,
    name: "Crm",
    Category: "Development",
    price: 30000,
    tax: 200,
    discount: 13200,
    total: 15200,
    code: "#10245752",
    assigned: "Ahmed Mohamed",
    description: "Lorem ipsum, or lipsum as it is sometimes know..",
    LastAction: "Today",
    Created: "6 Days ago",
  },
];
