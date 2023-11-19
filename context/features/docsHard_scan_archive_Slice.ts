import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type stateTypes = {
  loading: boolean;
  documents: {
    year: number;
    title: string;
    shelf_no: number;
    serial: number;
    doc: File;
  }[];
  error: string;
};

const initialState: stateTypes = {
  loading: false,
  documents: [],
  error: "",
};

const addFile = createAsyncThunk(
  "addFile/docsHard_scan_archive",
  async (
    { content, callback }: { content: any; callback: any },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/`,
        content,
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

      //   return [];
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const getAllFiles = createAsyncThunk(
  "getAll_Files/docsHard_scan_archive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/`,
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

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const docsHard_Slice = createSlice({
  name: "docsHard_scan_archive",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFiles.pending, (state) => {});
    builder.addCase(getAllFiles.fulfilled, (state, action) => {
      state.documents = action.payload;
    });
    builder.addCase(getAllFiles.rejected, (state) => {});
  },
});

export default docsHard_Slice.reducer;

export { addFile, getAllFiles };
