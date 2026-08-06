import { apiClient } from '@/api/axiosClient';
import type { ApiResponse } from '@/types/api';
import { getErrorMessage } from '@/utils/errorHandler';
import type { LoginFormData, SignupFormData } from '@/validators/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: {
    login: boolean;
    signup: boolean;
    googleAuth: boolean;
    fetchCurrentUser: boolean;
    forgotPassword: boolean;
    resetPassword: boolean;
    verifyEmail: boolean;
    logout: boolean;
  };
  error: {
    login: string | null;
    signup: string | null;
    googleAuth: string | null;
    fetchCurrentUser: string | null;
    forgotPassword: string | null;
    resetPassword: string | null;
    verifyEmail: string | null;
    logout: string | null;
  };
}

const initialState: AuthState = {
  user: null,
  loading: {
    login: false,
    signup: false,
    googleAuth: false,
    fetchCurrentUser: false,
    forgotPassword: false,
    resetPassword: false,
    verifyEmail: false,
    logout: false,
  },
  error: {
    login: null,
    signup: null,
    googleAuth: null,
    fetchCurrentUser: null,
    forgotPassword: null,
    resetPassword: null,
    verifyEmail: null,
    logout: null,
  },
};

// -------------------- ASYNC THUNKS --------------------

// Signup
export const signupUser = createAsyncThunk<ApiResponse, SignupFormData, { rejectValue: string }>(
  'auth/signupUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<ApiResponse>('/users/signup', payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Login
export const loginUser = createAsyncThunk<
  ApiResponse<User>,
  LoginFormData,
  { rejectValue: string }
>('auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<ApiResponse<User>>('/users/login', payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Google Auth
export const googleAuthUser = createAsyncThunk<
  ApiResponse<User>,
  { credential: string },
  { rejectValue: string }
>('auth/googleAuthUser', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<ApiResponse<User>>('/users/auth/google', payload);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/users/forgot-password', payload);
      return response.data.message;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/users/reset-password/${payload.token}`, {
        password: payload.password,
      });
      return response.data.message;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const verifyEmail = createAsyncThunk<ApiResponse, string, { rejectValue: string }>(
  'auth/verifyEmail',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiResponse>(`/users/verify-email/${token}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<ApiResponse<User>, void, { rejectValue: string }>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/me');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const logoutUser = createAsyncThunk<ApiResponse, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/users/logout', {});
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// -------------------- SLICE --------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading.signup = true;
        state.error.signup = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading.signup = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading.signup = false;
        state.error.signup = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading.login = true;
        state.error.login = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false;
        state.error.login = action.payload as string;
      })

      // Google Auth
      .addCase(googleAuthUser.pending, (state) => {
        state.loading.googleAuth = true;
        state.error.googleAuth = null;
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.loading.googleAuth = false;
        state.user = action.payload.data;
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.loading.googleAuth = false;
        state.error.googleAuth = action.payload as string;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading.fetchCurrentUser = true;
        state.error.fetchCurrentUser = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading.fetchCurrentUser = false;
        state.user = action.payload.data;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading.fetchCurrentUser = false;
        state.error.fetchCurrentUser = action.payload as string;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading.forgotPassword = true;
        state.error.forgotPassword = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading.forgotPassword = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading.forgotPassword = false;
        state.error.forgotPassword = action.payload as string;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading.resetPassword = true;
        state.error.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading.resetPassword = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.error.resetPassword = action.payload as string;
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading.verifyEmail = true;
        state.error.verifyEmail = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading.verifyEmail = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading.verifyEmail = false;
        state.error.verifyEmail = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading.logout = true;
        state.error.logout = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading.logout = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading.logout = false;
        state.error.logout = action.payload as string;
      });
  },
});

export default authSlice.reducer;
