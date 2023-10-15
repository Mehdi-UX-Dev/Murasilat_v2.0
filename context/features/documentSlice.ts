import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  fullname: string;
  email: string;
  contact_number: string | number;
  profile_pic: string;
  username: string;
  authority: {
    title: string;
  };
  title: string | null;
  role: string;
}

export interface DocumentType {
  serial: number;
  title: string;
  sender: UserType;
  receiver: UserType;
  date: string;
  content: string;
  read: boolean;
  urgency: string;
  document_type: 'maktoob' | 'istilam' | 'pishnihad';
  qr_code: string;
  responded: boolean;
  attachments: any[];
}
interface DocumentStateType {
  documents: DocumentType[];
  loading: boolean;
  error: string | any;
  receivers: UserType[];
  selectedReceiver: UserType | null;
}

const initialState: DocumentStateType = {
  documents: [],
  loading: false,
  error: null,
  receivers: [],
  selectedReceiver: null,
};

const fetchDocuments = createAsyncThunk<DocumentType[]>(
  'documents/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`,
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
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const fetchReceivers = createAsyncThunk(
  'documents/receivers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/`,
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
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export interface DocumentCreateArgsType {
  receiver: number | any;
  title: string;
  date: Date;
  content: string;
  urgency: string;
  summary: string;
  document_type?: 'maktoob' | 'istilam' | 'pishnihad';
  remarks?: string;
  files?: any;
}

type WriteDocuemntParams = {
  documentData: DocumentCreateArgsType;
  callback?: () => void;
};

const writeDocument = createAsyncThunk<DocumentType, WriteDocuemntParams>(
  'documents/create',
  async ({ documentData, callback }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`,
        { ...documentData },
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
      if (documentData?.files) {
        // handle file upload
      }
      callback?.();
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
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
        state.error = action.payload;
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
        state.error = action.payload;
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

        state.error = action.payload;
      });
  },
});

export default documentsSlice.reducer;
export const { selectReceiver } = documentsSlice.actions;

export { fetchDocuments, writeDocument, fetchReceivers };
