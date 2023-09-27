"use client";

import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import { langProps_PDF } from "@/universalTypes";

const PDF = ({ params: { locale } }: { params: { locale: Locale } }) => {
  const [lang, setLang] = useState<langProps_PDF>();
  useEffect(() => {
    const generatePDF = async () => {
      const element = document.getElementById("myElement");

      // Generate HTML2PDF
      {
        html2pdf().from(element).toContainer().save();
      }
    };

    generatePDF();
  }, []);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setLang(res);
    })();
  }, [locale]);

  return (
    <div id="myElement" className="flex">
      <div className="border w-72 h-96 border-black">
        <div className="border h-10 border-black text-center">Pishnihad</div>
        <div></div>
      </div>
      <div className="border w-72 relative  h-96 border-black">
        <div className="border  h-10 border-black text-center  ">
          Directions
        </div>
        <div className="h-[382px] top-0 right-0 w-4 absolute border border-black"></div>
      </div>
    </div>
  );
};

export default PDF;

export const html = ` <div className="border w-72 h-96 border-black">
<div className="border h-10 border-black text-center">Pishnihad</div><div></div> </div>
<div className="border w-72 relative  h-96 border-black">
<div className="border  h-10 border-black text-center  ">
  Directions
</div>
<div className="h-[382px] top-0 right-0 w-4 absolute border border-black"></div>
</div> `;
