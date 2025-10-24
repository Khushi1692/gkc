// store/slices/contactSlice.ts
import { apiClient } from '@/api/axiosClient';
import type { ContactUsInput } from '@/validators/contact';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ContactState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: null,
};

// Async thunk for sending contact form
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (formData: ContactUsInput, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/contact', formData);
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send message');
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload as string;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
