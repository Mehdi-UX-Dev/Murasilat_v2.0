"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { langProps_PDF } from "@/universalTypes";

const PDF = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const [lang, setLang] = useState<langProps_PDF>();
  useEffect(() => {
    const generatePDF = async () => {
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      {
        lang && html2pdf().from(element).toContainer()
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
      <PDFTemplate  {...lang} />
  );
};

export default PDF;
