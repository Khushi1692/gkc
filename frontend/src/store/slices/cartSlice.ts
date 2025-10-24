import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import type {
  AddItemToCartInput,
  Cart,
  CartItem,
  CheckoutPayload,
  GetCartResponse,
} from '@/types/cart';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

const branchId = localStorage.getItem('selectedBranchId');

// -------------------- ASYNC THUNKS --------------------

// Fetch cart
export const fetchCart = createAsyncThunk<
  ApiResponse<GetCartResponse>,
  void,
  { rejectValue: string }
>('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<ApiResponse<GetCartResponse>>(`/cart/${branchId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Add item
export const addItemToCart = createAsyncThunk<
  ApiResponse<Cart>,
  { payload: AddItemToCartInput },
  { rejectValue: string }
>('cart/addItemToCart', async ({ payload }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<ApiResponse<Cart>>(`/cart/${branchId}/add`, payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Update quantity
export const updateCartItemQuantity = createAsyncThunk<
  ApiResponse<Cart>,
  { itemId: string; quantity: number },
  { rejectValue: string }
>('cart/updateCartItemQuantity', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const response = await apiClient.patch<ApiResponse<Cart>>(`/cart/item/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Remove item
export const removeCartItem = createAsyncThunk<ApiResponse<Cart>, string, { rejectValue: string }>(
  'cart/removeCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/item/${itemId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk<ApiResponse<Cart>, void, { rejectValue: string }>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/clear`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

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
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading.add = false;
        state.cart = action.payload.data;
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
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading.update = false;
        state.cart = action.payload.data;
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
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading.remove = false;
        state.cart = action.payload.data;
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
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading.clear = false;
        state.cart = action.payload.data;
        state.skippedItems = [];
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
