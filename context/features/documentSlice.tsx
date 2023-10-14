import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  documents: [],
  loading: false,
  error: null,
  receivers: [],
  selectedReceiver: null,
};

const fetchDocuments = createAsyncThunk(
  "documents/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("TOKENS"))?.access,
            accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const fetchReceivers = createAsyncThunk(
  "documents/receivers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("TOKENS"))?.access,
            accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const writeDocument = createAsyncThunk(
  "documents/create",
  async (
    { documentData, callback }: { documentData: any; callback: any },
    { rejectWithValue }
  ) => {
    const tokensString = localStorage.getItem("TOKENS");
    const tokens = tokensString !== null ? JSON.parse(tokensString) : null;

    const authorizationHeader =
      tokens !== null ? `Bearer ${tokens.access}` : "";
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`,
        { ...documentData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationHeader,
            accept: "application/json",
          },
        }
      );
      if (documentData?.files) {
        // handle file upload
      }

      callback?.();
      return [];
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    selectReceiver: (state, action) => {
      state.selectedReceiver = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      })
      .addCase(writeDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(writeDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(writeDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      })
      .addCase(fetchReceivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReceivers.fulfilled, (state, action) => {
        state.receivers = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchReceivers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as null;
      });
  },
});

export default documentsSlice.reducer;
export const { selectReceiver } = documentsSlice.actions;

export { fetchDocuments, writeDocument, fetchReceivers };
