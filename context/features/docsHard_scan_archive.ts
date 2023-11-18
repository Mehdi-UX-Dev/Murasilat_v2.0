import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const addFile = createAsyncThunk(
  "addFile/docsHard_scan_archive",
  async (
    { content, callback }: { content: any; callback: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/maktoobs/`,
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
      return [];
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const docsHard_Slice = createSlice({
  name: "docsHard_scan_archive",
  initialState,
  reducers: {},
});

export default docsHard_Slice.reducer;

export { addFile };
