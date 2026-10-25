import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface EnquaryData {
  firstName: string;
  lastName: string;
  email: string;
  serviceNeeded: string;
  budget: string;
  message: string;
}

export interface EnquaryItem extends EnquaryData {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnquaryState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  lastSubmitted: EnquaryItem | null;
}

const initialState: EnquaryState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  lastSubmitted: null,
};

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// Async thunk to submit an enquiry (POST)
export const submitEnquary = createAsyncThunk<
  EnquaryItem,
  EnquaryData,
  { rejectValue: string }
>("enquary/submitEnquary", async (enquaryData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/enquary/enquary`,
      enquaryData,
      { withCredentials: true }
    );
    // Backend ApiResponse structure: { statusCode: 201, data: Enquary, message: string, success: true }
    return response.data?.data as EnquaryItem;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to submit enquiry. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

export const enquarySlice = createSlice({
  name: "enquary",
  initialState,
  reducers: {
    resetEnquaryStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
      state.lastSubmitted = null;
    },
    clearEnquaryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquary.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(submitEnquary.fulfilled, (state, action: PayloadAction<EnquaryItem>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastSubmitted = action.payload;
      })
      .addCase(submitEnquary.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload || "Failed to submit enquiry";
      });
  },
});

export const { resetEnquaryStatus, clearEnquaryError } = enquarySlice.actions;

// Aliases for alternate spelling
export const submitEnquiry = submitEnquary;
export const enquirySlice = enquarySlice;

export default enquarySlice.reducer;
