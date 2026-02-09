import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import type { Branch, BranchStatus, BranchWithOpeningHours } from '@/types/branch';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BranchState {
  selectedBranch: Branch | null;
  nearestBranch: Branch | null;
  allBranches: Branch[];
  branchStatus: {
    isOpen: boolean;
    branchName?: string;
    todayHours?: any;
  } | null;
  loading: {
    list: boolean;
    select: boolean;
    status: boolean;
  };
  error: {
    list: string | null;
    select: string | null;
    status: string | null;
  };
}

const initialState: BranchState = {
  selectedBranch: null,
  nearestBranch: null,
  allBranches: [],
  branchStatus: null,
  loading: {
    list: false,
    select: false,
    status: false,
  },
  error: {
    list: null,
    select: null,
    status: null,
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
  ApiResponse<BranchStatus>,
  { branchId: string },
  { rejectValue: string }
>('branch/fetchBranchStatus', async ({ branchId }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<ApiResponse<BranchStatus>>(`/branches/${branchId}/status`);
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
      })

      // ========== fetchBranchStatus ==========
      .addCase(fetchBranchStatus.pending, (state) => {
        state.loading.status = true;
        state.error.status = null;
      })
      .addCase(fetchBranchStatus.fulfilled, (state, action) => {
        state.loading.status = false;
        state.branchStatus = action.payload.data;
      })
      .addCase(fetchBranchStatus.rejected, (state, action) => {
        state.loading.status = false;
        state.error.status = action.payload || 'Could not fetch branch status';
      });
  },
});

export const { setSelectedBranch, loadBranchFromStorage } = branchSlice.actions;
export default branchSlice.reducer;
