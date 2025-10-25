import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import type { AddItemToCartInput, Cart, CartItem, GetCartResponse } from '@/types/cart';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CartState {
  cart: Cart | null;
  skippedItems: CartItem[];
  loading: {
    fetch: boolean;
    add: boolean;
    update: boolean;
    remove: boolean;
    clear: boolean;
    checkout: boolean;
  };
  error: {
    fetch: string | null;
    add: string | null;
    update: string | null;
    remove: string | null;
    clear: string | null;
    checkout: string | null;
  };
  lastOrderId?: string;
}

const initialState: CartState = {
  cart: null,
  skippedItems: [],
  loading: {
    fetch: false,
    add: false,
    update: false,
    remove: false,
    clear: false,
    checkout: false,
  },
  error: {
    fetch: null,
    add: null,
    update: null,
    remove: null,
    clear: null,
    checkout: null,
  },
  lastOrderId: undefined,
};

// -------------------- ASYNC THUNKS --------------------

// Fetch cart
export const fetchCart = createAsyncThunk<
  ApiResponse<GetCartResponse>,
  void,
  { rejectValue: string; state: RootState }
>('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const branchId = state.branch.selectedBranch?._id;
    if (!branchId) throw new Error('No branch selected');
    const response = await apiClient.get<ApiResponse<GetCartResponse>>(`/cart/${branchId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Add item
export const addItemToCart = createAsyncThunk<
  ApiResponse,
  { payload: AddItemToCartInput },
  { rejectValue: string; state: RootState }
>('cart/addItemToCart', async ({ payload }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const branchId = state.branch.selectedBranch?._id;
    if (!branchId) throw new Error('No branch selected');
    const response = await apiClient.post<ApiResponse>(`/cart/${branchId}/add`, payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Update quantity
export const updateCartItemQuantity = createAsyncThunk<
  ApiResponse,
  { itemId: string; quantity: number },
  { rejectValue: string; state: RootState }
>('cart/updateCartItemQuantity', async ({ itemId, quantity }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const branchId = state.branch.selectedBranch?._id;
    if (!branchId) throw new Error('No branch selected');
    const response = await apiClient.patch<ApiResponse>(`/cart/item/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Remove item
export const removeCartItem = createAsyncThunk<
  ApiResponse,
  string,
  { rejectValue: string; state: RootState }
>('cart/removeCartItem', async (itemId, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const branchId = state.branch.selectedBranch?._id;
    if (!branchId) throw new Error('No branch selected');
    const response = await apiClient.delete<ApiResponse>(`/cart/item/${itemId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Clear cart
export const clearCart = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: string; state: RootState }
>('cart/clearCart', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const branchId = state.branch.selectedBranch?._id;
    if (!branchId) throw new Error('No branch selected');
    const response = await apiClient.delete<ApiResponse>(`/cart/clear`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const createPaymentIntent = createAsyncThunk(
  'checkout/createPaymentIntent',
  async (
    { branchId, specialInstructions }: { branchId: string; specialInstructions: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiClient.post('/payments/create-intent', {
        branchId,
        specialInstructions,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// -------------------- SLICE --------------------

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: (state) => {
      if (state.cart) {
        state.cart.items = [];
      }
      state.skippedItems = [];
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- FETCH CART --------------------
      .addCase(fetchCart.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.cart = action.payload.data?.cart || null;
        state.skippedItems = action.payload.data?.skippedItems || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? 'Failed to fetch cart';
      })

      // -------------------- ADD ITEM --------------------
      .addCase(addItemToCart.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading.add = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.payload ?? 'Failed to add item';
      })

      // -------------------- UPDATE QUANTITY --------------------
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state) => {
        state.loading.update = false;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload ?? 'Failed to update item';
      })

      // -------------------- REMOVE ITEM --------------------
      .addCase(removeCartItem.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loading.remove = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading.remove = false;
        state.error.remove = action.payload ?? 'Failed to remove item';
      })

      // -------------------- CLEAR CART --------------------
      .addCase(clearCart.pending, (state) => {
        state.loading.clear = true;
        state.error.clear = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading.clear = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading.clear = false;
        state.error.clear = action.payload ?? 'Failed to clear cart';
      });

    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading.checkout = true;
        state.error.checkout = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading.checkout = false;
        state.lastOrderId = action.payload.orderId;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading.checkout = false;
        state.error.checkout = action.payload as string;
      });
  },
});

export const { resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
