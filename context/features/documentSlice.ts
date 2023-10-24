import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  document_type: "maktoob" | "istilam" | "pishnihad";
  qr_code: string;
  responded: boolean;
  attachments: any[];
}
interface DocumentStateType {
  documents: {
    unreadDocuments: DocumentType[];
    sentRecently: DocumentType[];
    receivedRecently: DocumentType[];
  };
  loading: boolean;
  error: string | any;
  pdf: {
    serial: number;
    content: string;
    document_type: string;
    urgency: "N" | "U" | "C" | "A";
  };
  userProfileView: boolean;
  userInfo: UserType | any;
  receivers: UserType[];
  selectedReceiver: UserType | null;
  searchedDocuments: object;
  searchedDoumentsModalActive: boolean;
  searchedDocumentLoading: boolean;
  bookmark: {
    activeModal: boolean;
    data: object | null;
    error: string;
  };
}

const initialState: DocumentStateType = {
  documents: {
    unreadDocuments: [],
    sentRecently: [],
    receivedRecently: [],
  },
  receivers: [],
  pdf: {},
  loading: false,
  error: null,
  selectedReceiver: null,
  userProfileView: false,
  userInfo: {},
  searchedDocuments: {},
  searchedDoumentsModalActive: false,
  searchedDocumentLoading: false,
  bookmark: {
    activeModal: false,
    data: null,
    error: "",
  },
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
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
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
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
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

const saveToWarida = createAsyncThunk(
  "documents/Update",
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
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("TOKENS") || "")?.access,
            accept: "application/json",
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
  "documents/create",
  async (
    { documentData, callback }: { documentData: any; callback: any },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    Object.entries(documentData).map(([key, value]) => {
      if (key === "attachments") {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else
        formData.append(
          key,
          key === "date" ? new Date(value).toISOString() : value
        );
    });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`,
        formData,
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
  "documents/UserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/user_info`,
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
      return rejectWithValue(error.response.data.detail);
    }
  }
);

const searchDocumentsDashboardPage = createAsyncThunk(
  "searchDocumentsDashboardPage",
  async ({ value }: { value: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/search/`,
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

const fetchDocumentsBySerial = createAsyncThunk(
  "fetchDocumentsBySerial",
  async (
    { type, serial }: { type: string; serial: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${type}/${serial}`,
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

const saveToBookMark = createAsyncThunk(
  "saveToBookmark",
  async (
    { documentType, documentId }: { documentType: string; documentId: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/bookmarks/`,
        { documentId: documentId, documentType: documentType },
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

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    selectReceiver: (state, action) => {
      state.selectedReceiver = action.payload;
    },

    showUserInfo: (state) => {
      state.userProfileView = true;
    },
    hideUserInfo: (state) => {
      state.userProfileView = false;
    },
    showSearchedDocumentModal: (state) => {
      state.searchedDoumentsModalActive = true;
    },
    hideSearchedDocumentModal: (state) => {
      state.searchedDoumentsModalActive = false;
    },

    showBookmarkModal: (state) => {
      state.bookmark.activeModal = true;
    },

    hideBookmarkModal: (state) => {
      state.bookmark.activeModal = false;
      state.bookmark.error = "";
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
      })
      .addCase(searchDocumentsDashboardPage.pending, (state) => {
        state.searchedDocumentLoading = true;
      })
      .addCase(searchDocumentsDashboardPage.fulfilled, (state, action) => {
        state.searchedDocumentLoading = false;
        state.searchedDocuments = action.payload;
      })
      .addCase(searchDocumentsDashboardPage.rejected, (state, action) => {
        state.searchedDocumentLoading = false;

        state.error = action.payload as null;
      })
      .addCase(fetchDocumentsBySerial.pending, (state) => {})
      .addCase(fetchDocumentsBySerial.fulfilled, (state, action) => {
        state.pdf = action.payload;
      })
      .addCase(fetchDocumentsBySerial.rejected, (state, action) => {})

      .addCase(saveToBookMark.fulfilled, (state, action) => {
        state.bookmark.data = action.payload;
      })
      .addCase(saveToBookMark.rejected, (state, action) => {
        state.bookmark.error = action.payload as string;
      });
  },
});

export default documentsSlice.reducer;
export const {
  selectReceiver,
  showUserInfo,
  hideUserInfo,
  showSearchedDocumentModal,
  hideSearchedDocumentModal,
  showBookmarkModal,
  hideBookmarkModal,
} = documentsSlice.actions;

export {
  fetchDocumentsBySerial,
  fetchDocuments,
  writeDocument,
  fetchReceivers,
  saveToWarida,
  getUserProfile,
  searchDocumentsDashboardPage,
  saveToBookMark,
};
