import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserType {
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
  pdf: { visible: boolean; body: string };
  userProfileView: boolean;
  userInfo: UserType | any;
  receivers: UserType[];
  selectedReceiver: UserType | null;
}

const initialState: DocumentStateType = {
  documents: [],
  receivers: [],
  pdf: {
    visible: false,
    body: '',
  },
  loading: false,
  error: null,
  selectedReceiver: null,
  userProfileView: false,
  userInfo: {},
};

const fetchDocuments = createAsyncThunk(
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

const saveToWarida = createAsyncThunk(
  'documents/Update',
  async (
    {
      id,
      content_update,
      summary,
      remarks,
    }: {
      id: number;
      content_update: string;
      summary: string;
      remarks: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/${id}/save_to_warida/`,
        { content_update, summary, remarks },
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

      return [];
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const writeDocument = createAsyncThunk(
  'documents/create',
  async (
    { documentData, callback }: { documentData: any; callback: any },
    { rejectWithValue }
  ) => {
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
      return [];
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const getUserProfile = createAsyncThunk(
  'documents/UserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/user_info`,
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

      console.log(response.data);

      return response.data;
    } catch (error: any) {
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
    showPreview: (state) => {
      state.pdf.visible = true;
    },
    hidePreview: (state) => {
      state.pdf.visible = false;
    },
    showUserInfo: (state) => {
      state.userProfileView = true;
    },
    hideUserInfo: (state) => {
      state.userProfileView = false;
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
      })
      .addCase(getUserProfile.pending, (state) => {})
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload as null;
      });
  },
});

export default documentsSlice.reducer;
export const {
  selectReceiver,
  showPreview,
  hidePreview,
  showUserInfo,
  hideUserInfo,
} = documentsSlice.actions;

export {
  fetchDocuments,
  writeDocument,
  fetchReceivers,
  saveToWarida,
  getUserProfile,
};
