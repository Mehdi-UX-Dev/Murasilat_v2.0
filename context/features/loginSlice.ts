import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  SESSION_TYPE,
  TOKENS_TYPE,
  clearSession,
  getUser,
  setToken,
} from '@/utils/auth';

type LoginParams = { email: string; password: string; callback?: () => void };

interface LoginState {
  user: SESSION_TYPE | null;
  loading: boolean;
  error: string | any;
}

const initialState: LoginState = {
  user: getUser(),
  loading: false,
  error: null,
};

const login = createAsyncThunk<TOKENS_TYPE, LoginParams>(
  'Login',
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login/`,
        { email, password }
      );
      callback?.();
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        return rejectWithValue(error.code);
      } else {
        return rejectWithValue(error.response.data.detail || error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      clearSession();
      state.user = null;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      setToken(action.payload);
      state.user = jwtDecode(action.payload?.access);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;

export const { logout, clearError } = userSlice.actions;
export { login };
