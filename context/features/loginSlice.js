"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getUser, setToken } from "../../utils/auth";

const initialState = {
  user: getUser(),
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  "Login",
  async ({ email, password, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login/`,
        { email, password }
      );
      callback?.();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      clearSession();
      state.user = null;
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

export const { logout } = userSlice.actions;
export { login };
