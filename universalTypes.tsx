import { Locale } from "./i18n-config";

export type localeProps = {
  params: { locale: Locale };
};

// pdf page language props
export type langProps_PDF = {
  moh?: string;
  kudirectorate?: string;
  faculty_directorate?: string;
  office?: string;
  faculty_info?: string;
  address?: string;
  phone?: string;
  webiste?: string;
  doc_number?: string;
  doc_date?: string;
  warida_num?: string;
};

// archive main props
export type langProps_ARCHIVE = {
  search: string;
  date: string;
  sender: string;
  title: string;
  number: string;
  content: string;
};

// write page props
export type langProps_WRITE = {
  send_document: string;
  preview_draft: string;
  title: string;
  send_to: string;
  summary: string;
  quill_placeholder: string;
};

// data that must be submitted to the server
export type writtenDocumentValues_PROPS = {
  date: string;
  docNumber: number;
  docType: "normal" | "emergency" | "announcment" | "confidential";
  quillValue: string;
  recieverList: Array<{
    id: number;
    name: string;
    position: string;
    image: string;
  }>;
  title: string;
  summary: string;
  file?: File;
};

export type langProps_DASHBOARD = {
  dashboard: string;
  write: string;
  maktoob: string;
  istilam: string;
  pishnihad: string;
  archive: string;
  recents: string;
  all_sadira: string;
  all_warida: string;
  broadcast: string;
  create_document: string;
  preview_document: string;
  document_des: string;
  log_out: string;
};

// 3 types of document that is rendered on layout page
export type writtenDocumentTypeProps_LAYOUT = {
  create_maktoob: string;
  create_istilam: string;
  create_pishniahd: string;
};

// login page input field error state props

export type errorProps_LOGIN = {
  inputState: "Default" | "ErrorState";
  msg: string;
  status: boolean;
};

// LOGIN page credentials props
export type credentialsProps_LOGIN = {
  [key: string]: string;
};


// LOGIN PAGE lang props 
export type langProps_LOGIN = {
  header: string;
  username: string;
  password: string;
  submit: string;
  invalid_credentials: string;
};
