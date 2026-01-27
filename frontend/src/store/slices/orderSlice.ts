import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/api/axiosClient';
import type { CartItem } from '@/types/cart';
import type { ApiResponse } from '@/types/api';

export interface Order {
  _id: string;
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  printStatus?: 'pending' | 'printed' | 'failed';
  printedAt?: string;
  printAttempts?: number;
  createdAt: string;
  specialInstructions?: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch user orders
export const fetchMyOrders = createAsyncThunk<ApiResponse<Order[]>, void, { rejectValue: string }>(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>('/orders/my-orders');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data || [];
        state.loading = false;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
