import { clearSearch } from '@/context/features/archiveSlice';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type stateTypes = {
  loading: boolean;
  folders: { year?: string }[];
  error: null;
  shelf: { shelf_number: number }[];
  documents: {
    serial?: number;
    title?: string;
    archived_document?: string;
    shelf?: number;
  }[];
  searchDetail: {
    id?: number;
    serial?: number;
    title?: string;
    archived_document?: string;
    shelf?: number;
  }[];
};

const initialState: stateTypes = {
  loading: false,
  folders: [],
  error: null,
  shelf: [],
  documents: [],
  searchDetail: [],
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const getAllFolders = createAsyncThunk(
  "getAll_Files/docsHard_scan_archive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/`,
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const getShelf = createAsyncThunk(
  "getAll_Files_From_Folder/docsHard_scan_archive",
  async ({ year }: { year: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/get_details/`,
        {
          year: year,
        },
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const getDocumentsFromShelf = createAsyncThunk(
  "getAll_Files_From_Shelf/docsHard_scan_archive",
  async (
    { year, shelf }: { year: number; shelf: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/get_details/`,
        {
          year: year,
          shelf: shelf,
        },
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const searchDocScans = createAsyncThunk(
  "search/docsHard_scan_archive",
  async ({ serial }: { serial: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/local_archive/search/`,
        {
          serial,
        },
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const docsHard_Slice = createSlice({
  name: "docsHard_scan_archive",
  initialState,
  reducers: {
    clearSearch_scan: (state) => {
      state.searchDetail = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFolders.pending, (state) => {});
    builder.addCase(getAllFolders.fulfilled, (state, action) => {
      state.folders = action.payload;
    });
    builder.addCase(getAllFolders.rejected, (state, action) => {
      state.error = action.payload as null;
    });
    builder.addCase(getShelf.pending, (state) => {});
    builder.addCase(getShelf.fulfilled, (state, action) => {
      state.shelf = action.payload;
    });
    builder.addCase(getShelf.rejected, (state, action) => {
      state.error = action.payload as null;
    });
    builder.addCase(getDocumentsFromShelf.pending, (state) => {});
    builder.addCase(getDocumentsFromShelf.fulfilled, (state, action) => {
      state.documents = action.payload;
    });
    builder.addCase(getDocumentsFromShelf.rejected, (state, action) => {
      state.error = action.payload as null;
    });
    builder.addCase(searchDocScans.pending, (state) => {});
    builder.addCase(searchDocScans.fulfilled, (state, action) => {
      state.searchDetail = action.payload;
    });
    builder.addCase(searchDocScans.rejected, (state, action) => {
      state.error = action.payload as null;
    });
  },
});

export default docsHard_Slice.reducer;

export const  {clearSearch_scan} = docsHard_Slice.actions

export {
  addFile,
  getAllFolders,
  getShelf,
  getDocumentsFromShelf,
  searchDocScans,
};
