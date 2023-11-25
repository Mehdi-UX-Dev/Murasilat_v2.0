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
  error: {
    userError?: null;
    fetchDocumentsError?: null;
    archiveDocumentError?: null;
    replyDocumentError?: null;
    writeDocumentError?: null;
    fetchDocumentsBySerialError?: null;
    searchDocumentsDashboardPageError?: null;
    fetchReceiversError?: null;
  };
  pdf:
     {
        serial: number;
        content: string;
        document_type: string;
        urgency: "N" | "U" | "C" | "A";
        receiver: {
          id: number;
        };
        responded: boolean;
        reply: string;
        request: string;
      }
    | any;
  userProfileView: boolean;
  userInfo: UserType | any;
  receivers: UserType[];
  selectedReceiver: UserType | null;
  searchedDocuments: {
    sadira?: [
      {
        document: {
          serial: string;
          title: string;
          receiver: {
            fullname: string;
          };
        };
      }
    ];
    warida?: [
      {
        document: {
          serial: string;
          title: string;
          sender: {
            fullname: string;
          };
        };
      }
    ];
  };
  searchedDoumentsModalActive: boolean;
  searchedDocumentLoading: boolean;
  bookmark: {
    activeModal: boolean;
    data: object | null;
    error: string;
  };
  istilam: {
    inquiry: string;
    reply: string;
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
  error: {},
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
  istilam: {
    inquiry: "",
    reply: "",
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

const replyDocument = createAsyncThunk(
  "documents/update",
  async (
    {
      id,
      reply,
      callback,
    }: {
      id: number;
      reply: string;
      callback: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/${id}/`,
        { reply },
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

      callback?.();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const archiveDocument = createAsyncThunk(
  "archive/update",
  async (
    {
      id,
      callback,
    }: {
      id: number;
      callback: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/${id}/mark_as_archived/`,
        {},
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

      callback?.();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const saveToWarida = createAsyncThunk(
  "maktoobs/update",
  async (
    {
      id,
      content_update,
      summary,
      remarks,
      callback,
    }: {
      id: number;
      content_update: string;
      summary: string;
      remarks: string;
      callback: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/maktoobs/${id}/save_to_warida/`,
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

      callback?.();
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const writeMaktoob = createAsyncThunk(
  "maktoobs/create",
  async (
    { maktoobData, callback }: { maktoobData: any; callback: any },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    Object.entries(maktoobData).map(([key, value]: [string, unknown]) => {
      if (key === "attachments" && Array.isArray(value)) {
        value.forEach((file: unknown) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else {
        formData.append(
          key,
          key === "date"
            ? new Date(value as string).toISOString()
            : (value as string)
        );
      }
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/maktoobs/`,
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

      //! not handled
      if (maktoobData?.files) {
        // handle file upload
      }

      callback?.();
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
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
    Object.entries(documentData).map(([key, value]: [string, unknown]) => {
      if (key === "attachments" && Array.isArray(value)) {
        value.forEach((file: unknown) => {
          if (file instanceof File) formData.append(key, file);
        });
      } else if (key === "content") {
        formData.append("request", value as string);
      } else
        formData.append(
          key,
          key === "date"
            ? new Date(value as string).toISOString()
            : (value as string)
        );
    });

    try {
      await axios.post(
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

      //! not handled
      if (documentData?.files) {
        // handle file upload
      }

      callback?.();
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

const searchDocumentsDashboardPage = createAsyncThunk(
  "searchDocumentsDashboardPage",
  async ({ value }: { value: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/maktoobs/search/`,
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

const fetchDocumentsBySerial = createAsyncThunk(
  "fetchDocumentsBySerial",
  async (
    {
      type,
      serial,
    }: {
      type: "maktoob" | "istilam" | "pishnihad" | "broadcast";
      serial: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const urlMaps = {
        maktoob: "maktoobs",
        istilam: "documents",
        pishnihad: "documents",
        broadcast: "broadcasts",
      };
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${urlMaps[type]}/${serial}`,
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

const deleteFromBookMark = createAsyncThunk(
  "deleteFromBookMark",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/bookmarks/${id}`,
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

    showDeletedBookmarkModal: () => {},
    hideSearchModalError: (state) => {
      state.error.searchDocumentsDashboardPageError = null;
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
        state.error.fetchDocumentsError = null;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error.fetchDocumentsError = action.payload as null;
      })
      .addCase(writeMaktoob.pending, (state) => {
        state.loading = true;
      })
      .addCase(writeMaktoob.fulfilled, (state, action) => {
        state.loading = false;
        state.error.writeDocumentError = null;
      })
      .addCase(writeMaktoob.rejected, (state, action) => {
        state.loading = false;
        state.error.writeDocumentError = action.payload as null;
      })
      .addCase(fetchReceivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReceivers.fulfilled, (state, action) => {
        state.receivers = action.payload;
        state.loading = false;
        state.error.fetchReceiversError = null;
      })
      .addCase(fetchReceivers.rejected, (state, action) => {
        state.loading = false;
        state.error.fetchReceiversError = action.payload as null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.error.userError = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error.userError = action.payload as null;
        state.loading = false;
      })
      .addCase(searchDocumentsDashboardPage.pending, (state) => {
        state.searchedDocumentLoading = true;
      })
      .addCase(searchDocumentsDashboardPage.fulfilled, (state, action) => {
        state.searchedDocumentLoading = false;
        state.searchedDocuments = action.payload;
        state.error.searchDocumentsDashboardPageError = null;
      })
      .addCase(searchDocumentsDashboardPage.rejected, (state, action) => {
        state.searchedDocumentLoading = false;
        state.error.searchDocumentsDashboardPageError = action.payload as null;
      })
      .addCase(fetchDocumentsBySerial.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocumentsBySerial.fulfilled, (state, action) => {
        state.pdf = action.payload;
        state.loading = false;
        state.error.fetchDocumentsBySerialError = null;
      })
      .addCase(fetchDocumentsBySerial.rejected, (state, action) => {
        state.error.fetchDocumentsBySerialError = action.payload as null;
        state.loading = false;
      })

      .addCase(saveToBookMark.fulfilled, (state, action) => {
        state.bookmark.data = action.payload;
      })
      .addCase(saveToBookMark.rejected, (state, action) => {
        state.bookmark.error = action.payload as string;
      })
      .addCase(writeDocument.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(writeDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.error.writeDocumentError = null;
      })
      .addCase(writeDocument.rejected, (state, action) => {
        state.loading = false;
        state.error.writeDocumentError = action.payload as null;
      })
      .addCase(replyDocument.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(replyDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.error.replyDocumentError = null;
      })
      .addCase(replyDocument.rejected, (state, action) => {
        state.loading = false;
        state.error.replyDocumentError = action.payload as null;
      })
      .addCase(archiveDocument.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(archiveDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.error.archiveDocumentError = null;
      })
      .addCase(archiveDocument.rejected, (state, action) => {
        state.loading = false;
        state.error.archiveDocumentError = action.payload as null;
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
  hideSearchModalError,
} = documentsSlice.actions;

export {
  fetchDocumentsBySerial,
  fetchDocuments,
  writeMaktoob,
  fetchReceivers,
  saveToWarida,
  getUserProfile,
  searchDocumentsDashboardPage,
  saveToBookMark,
  deleteFromBookMark,
  writeDocument,
  replyDocument,
  archiveDocument,
};
