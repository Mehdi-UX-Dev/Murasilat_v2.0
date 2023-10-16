import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  documents: [],
  searchedResults: [],
  isInSearch: false,
  loading: true,
  error: null,
};

const fetchArchiveDocuments = createAsyncThunk(
  "documents/warida",
  async (type: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${type}/`,
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
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const searchArchiveDocuments = createAsyncThunk(
  "searchArchive",
  async (
    { type, value }: { type: string; value: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${type}/search/`,
        { query: value },
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
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchedResults = [];
      state.isInSearch = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArchiveDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
      })
      .addCase(fetchArchiveDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      })
      .addCase(searchArchiveDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArchiveDocuments.fulfilled, (state, action) => {
        state.searchedResults = action.payload;
        state.isInSearch = true;
      })
      .addCase(searchArchiveDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      });
  },
});

export default archiveSlice.reducer;

export const { clearSearch } = archiveSlice.actions;

export { fetchArchiveDocuments, searchArchiveDocuments };
