import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from './documentSlice';

export interface BroadcastType {
  serial: number;
  title: string;
  sender: UserType;
  date: string;
  content: string;
  read: boolean;
  qr_code: string;
}

interface BroadcastStateType {
  broadcasts: BroadcastType[];
  searchResults: BroadcastType[];
  selectedDocument: BroadcastType | any;
  query: string;
  loading: boolean;
  error: string | any;
}

export interface BroadcastCreateProps {
  date: string | any;
  value?: {
    title?: string;
    content?: string;
    summary?: string;
    remarks?: string;
    subject?: string;
    attachments?: File;
  };

  callback?: () => void | any;
}

const initialState: BroadcastStateType = {
  broadcasts: [],
  searchResults: [],
  selectedDocument: null,
  query: '',
  loading: false,
  error: null,
};

const fetchBroadcasts = createAsyncThunk<any, DocumentType[]>(
  'broadcast/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/broadcasts/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
            accept: 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail || error.response.data);
    }
  }
);

const saveBroadCast = createAsyncThunk(
  'broadcast/create',
  async (
    { serial, callback }: { serial: number; callback: () => void },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/broadcasts/mark_as_read/`,
        {
          broadcastIds: [serial],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
            accept: 'application/json',
          },
        }
      );
      callback?.();
      console.log(response);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const createBroadcast = createAsyncThunk<BroadcastType, BroadcastCreateProps>(
  'broadcast/create',
  async ({ callback, date, value = {} }, { rejectWithValue }) => {
    const data = new FormData();
    Object.entries(value).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('date', date);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/broadcasts/`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
            accept: 'application/json',
          },
        }
      );
      callback?.();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const searchBroadcast = createAsyncThunk<BroadcastType[], { query: string }>(
  'broadcast/search',
  async ({ query }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/broadcasts/search/`,
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('TOKENS') || '')?.access,
            accept: 'application/json',
          },
        }
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail || error.response.data);
    }
  }
);

const broadcastsSlice = createSlice({
  name: 'broadcasts',
  initialState,
  reducers: {
    showBroadcast: (state, action) => {
      state.selectedDocument = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBroadcasts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBroadcasts.fulfilled, (state, action) => {
        state.broadcasts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBroadcasts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBroadcast.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBroadcast.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createBroadcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchBroadcast.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBroadcast.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchBroadcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default broadcastsSlice.reducer;
export const { showBroadcast, setQuery, resetQuery } = broadcastsSlice.actions;

export { fetchBroadcasts, searchBroadcast, createBroadcast, saveBroadCast };
