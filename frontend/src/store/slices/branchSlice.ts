import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import type { Branch, BranchWithOpeningHours } from '@/types/branch';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BranchState {
  selectedBranch: Branch | null;
  nearestBranch: Branch | null;
  allBranches: Branch[];
  loading: {
    list: boolean;
    select: boolean;
  };
  error: {
    list: string | null;
    select: string | null;
  };
}

const initialState: BranchState = {
  selectedBranch: null,
  nearestBranch: null,
  allBranches: [],
  loading: {
    list: false,
    select: false,
  },
  error: {
    list: null,
    select: null,
  },
};

export const fetchNearestBranch = createAsyncThunk<
  ApiResponse<Branch>,
  { lat: number; lng: number },
  { rejectValue: string }
>('branch/fetchNearestBranch', async ({ lat, lng }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<ApiResponse<Branch>>(
      `/branches/nearest?lat=${lat}&lng=${lng}`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const fetchAllBranches = createAsyncThunk<
  ApiResponse<Branch[]>,
  { lat?: number; lng?: number },
  { rejectValue: string }
>('branch/fetchAllBranches', async ({ lat, lng }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();
    if (lat !== undefined && lng !== undefined) {
      params.append('lat', lat.toString());
      params.append('lng', lng.toString());
    }

    const url = params.toString() ? `/branches?${params.toString()}` : `/branches`;

    const response = await apiClient.get<ApiResponse<Branch[]>>(url);

    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const fetchBranchStatus = createAsyncThunk<
  ApiResponse<{ isOpen: boolean; operatingHours: string[] }>,
  { branchId: string },
  { rejectValue: string }
>('branch/fetchBranchStatus', async ({ branchId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<
      ApiResponse<{ isOpen: boolean; operatingHours: string[] }>
    >(`/branches/${branchId}/status`);
    return response.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const getBranchById = createAsyncThunk<
  ApiResponse<BranchWithOpeningHours>,
  { branchId: string },
  { rejectValue: string }
>('branch/getBranchById', async ({ branchId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<ApiResponse<BranchWithOpeningHours>>(
      `/branches/${branchId}`
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<Branch>) => {
      state.selectedBranch = action.payload;
      localStorage.setItem('selectedBranch', JSON.stringify(action.payload));
      localStorage.setItem('selectedBranchId', action.payload._id);
    },
    loadBranchFromStorage: (state) => {
      const saved = localStorage.getItem('selectedBranch');
      if (saved) {
        state.selectedBranch = JSON.parse(saved);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== fetchNearestBranch ==========
      .addCase(fetchNearestBranch.pending, (state) => {
        state.loading.select = true;
        state.error.select = null;
      })
      .addCase(fetchNearestBranch.fulfilled, (state, action) => {
        state.loading.select = false;
        state.nearestBranch = action.payload.data;
      })
      .addCase(fetchNearestBranch.rejected, (state, action) => {
        state.loading.select = false;
        state.error.select = action.payload || 'Could not fetch nearest branch';
      })

      // ========== fetchAllBranches ==========
      .addCase(fetchAllBranches.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.loading.list = false;
        state.allBranches = action.payload.data || [];
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload || 'Could not fetch branch list';
      });
  },
});

export const { setSelectedBranch, loadBranchFromStorage } = branchSlice.actions;
export default branchSlice.reducer;
