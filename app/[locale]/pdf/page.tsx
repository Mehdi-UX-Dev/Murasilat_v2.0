"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import FetchDictionary from "@/hooks/getDictionary";

type langProps = {
  moh: string;
  kudirectorate: string;
  faculty_directorate: string;
  office: string;
  faculty_info: string;
  address: string;
  phone: string;
  webiste: string;
  doc_number: string;
  doc_date: string;
  warida_num: string;
};

const HelloWorldPDF = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  
  const [lang, setLang] = useState<langProps>();
  useEffect(() => {
    const generatePDF = async () => {
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      {
        lang && html2pdf().from(element).toContainer().save();
      }
    };

    generatePDF();
  }, [lang]);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setLang(res);
    })();
  }, [locale]);


  return (
  <div></div>
  );
};

export default HelloWorldPDF;
