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
