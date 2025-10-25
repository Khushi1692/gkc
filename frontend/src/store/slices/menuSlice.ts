import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import type { Category, Product } from '@/types/menu';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  categories: Category[];
  products: Product[];
  selectedCategoryId: string | null;
  loading: {
    categories: boolean;
    products: boolean;
  };
  error: {
    categories: string | null;
    products: string | null;
  };
}

const initialState: MenuState = {
  categories: [],
  products: [],
  selectedCategoryId: null,
  loading: {
    categories: false,
    products: false,
  },
  error: {
    categories: null,
    products: null,
  },
};

const branchId = localStorage.getItem('selectedBranchId');

export const fetchCategories = createAsyncThunk<
  ApiResponse<Category[]>,
  { branchId: string },
  { rejectValue: string }
>('menu/fetchCategories', async ({ branchId }, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<ApiResponse<Category[]>>(`/menu/${branchId}/categories`);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchProductsByCategory = createAsyncThunk<
  ApiResponse<Product[]>,
  { branchId: string; categoryId: string },
  { rejectValue: string }
>('menu/fetchProductsByCategory', async ({ branchId, categoryId }, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<ApiResponse<Product[]>>(
      `/menu/${branchId}/products/${categoryId}`
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload.data || [];
        if (action.payload.data && action.payload.data.length > 0) {
          state.selectedCategoryId = action.payload.data[0]._id;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload || 'Error fetching categories';
      })

      // Products
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading.products = true;
        state.error.products = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading.products = false;
        state.products = action.payload.data || [];
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading.products = false;
        state.error.products = action.payload || 'Error fetching products';
      });
  },
});

export const { setSelectedCategory, clearProducts } = menuSlice.actions;
export default menuSlice.reducer;
