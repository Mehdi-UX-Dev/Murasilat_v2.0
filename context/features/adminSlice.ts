import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type stateType = {
  allUsers: {
    authority: { title: string };
    contact_number: number;
    email: string;
    first_name: string;
    fullname: string;
    id: number;
    last_name: string;
    profile_pic: string;
    role: string;
    title: string;
    username: string;
  }[];
  authorities: { title: string }[];
};

const initialState: stateType = {
  allUsers: [],
  authorities: [],
};

const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
          },
        }
      );

      return res.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

const addUser = createAsyncThunk(
  "addUser",
  async (
    { data, callback }: { data: any; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
          },
        }
      );

      callback?.();
      return res.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

const deleteUser = createAsyncThunk(
  "addUser",
  async (
    { id, callback }: { id: number; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
       await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
          },
        }
      );

      callback?.();
    } catch (e) {
      rejectWithValue(e);
    }
  }
);
const addAuthority = createAsyncThunk(
  "saveToAuthority",
  async (
    {
      title: { title },
      callback,
    }: { title: { title: string }; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/authorities/`,
        { title },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
          },
        }
      );
      callback?.();

      return res.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

const getAuthorities = createAsyncThunk(
  "getAllAuthorities",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/authorities/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
          },
        }
      );
      return res.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

const adminSlice = createSlice({
  name: "Admin Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthorities.fulfilled, (state, action) => {
      state.authorities = action.payload;
    });

    builder.addCase(getAuthorities.rejected, (state, action) => {});
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {});
  },
});

export default adminSlice.reducer;

export const {} = adminSlice.actions;

export { getAuthorities, getAllUsers, addAuthority, addUser, deleteUser };
