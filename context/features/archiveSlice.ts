import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type documentDataType = {
  count?: number;
  next?: null;
  previous?: null;
  results?: {
    document?: {
      serial?: number;
      title?: string;
      document_type?: string;
      sender?: {
        id: number;
        first_name: string;
        last_name: string;
        fullname: string;
        email: string;
        contact_number: string;
        profile_pic: string;
        username: string;
        authority: {
          title: string;
        };
        title: string;
        role: string;
      };
      receiver?: {
        id: number;
        first_name: string;
        last_name: string;
        fullname: string;
        email: string;
        contact_number: string;
        profile_pic: string;
        username: string;
        authority: {
          title: string;
        };
        title: string;
        role: string;
      };
      date?: string;
      request?: string;
      reply?: string;
      state?: string;
      bookmarked?: false;
    };
    summary?: string;
    remarks?: string;
  }[];
};

type stateTypes = {
  error: null;
  documents: documentDataType;
  searchedResults: Pick<documentDataType, "results">;
  isInSearch: boolean;
  loading: boolean;
};

const initialState: stateTypes = {
  documents: {},
  searchedResults: { results: [] },
  isInSearch: false,
  loading: true,
  error: null,
};

const fetchArchiveDocuments = createAsyncThunk(
  "documents/warida && sadira",
  async (
    { type, page }: { type: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${type}/?page=${page}`,
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchedResults = {};
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
        state.searchedResults.results = action.payload;
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
